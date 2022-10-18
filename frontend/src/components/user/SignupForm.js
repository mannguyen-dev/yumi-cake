import useInput from "../../hooks/use-input";
import classes from "./LoginForm.module.css";
import signupImg from "../../assets/signupCake.webp";
import { uiActions } from "../../store/ui-slice";
import { useDispatch } from "react-redux";
import { Fragment, useState } from "react";
import { userActions } from "../../store/user-slice";
import UserDataService from "../../services/user";
import LoginForm from "./LoginForm";

const validateEmail = (value) => value.includes("@");
const validatePassword = (value) => value.length >= 8;

const SignupForm = (props) => {
    const dispatch = useDispatch();

    const [error, setError] = useState(null);
    const [isLogin, setIsLogin] = useState(false);
    const [siginSucess, setSigninSucess] = useState(false);

    const {
        value: enteredEmail,
        isValid: enteredEmailIsValid,
        hasError: enteredEmailIsInvalid,
        valueChangeHandler: emailInputChangeHandler,
        inputBlurHandler: emailInputBlurHandler,
        reset: resetEmailInput,
    } = useInput(validateEmail);

    const {
        value: enteredPassword,
        isValid: enteredPasswordIsValid,
        hasError: enteredPasswordIsInvalid,
        valueChangeHandler: passwordInputChangeHandler,
        inputBlurHandler: passwordInputBlurHandler,
        reset: resetPasswordInput,
    } = useInput(validatePassword);

    const {
        value: enteredRePass,
        isValid: enteredRePassIsValid,
        hasError: enteredRePassIsInvalid,
        valueChangeHandler: rePassInputChangeHandler,
        inputBlurHandler: rePassInputBlurHandler,
        reset: resetRePassInput,
    } = useInput(validatePassword);

    let formIsValid = false;

    if (enteredPasswordIsValid && enteredEmailIsValid && enteredRePassIsValid) {
        formIsValid = true;
    }

    const formSubmissionHandler = async (event) => {
        event.preventDefault();

        try {
            if (enteredPassword !== enteredRePass) {
                throw new Error("Mật khẩu nhập lại không khớp!");
            }

            if (!formIsValid) {
                return;
            }

            const response = UserDataService.signup(enteredEmail, enteredPassword);

            const responseData = await Promise.resolve(response);

            resetPasswordInput();
            resetEmailInput();
            resetRePassInput();

            setSigninSucess(true);

            dispatch(userActions.login({ user: responseData.data.user, authToken: responseData.data.token }));
        } catch (e) {
            if (e.response && e.response.status === 400) setError("Lỗi... Email của bạn đã được đăng ký!");
            else setError(e.message);
        }
    };

    const switchLoginHandler = (event) => {
        event.preventDefault();
        setIsLogin(true);
    };

    const rePassInputClasses = enteredRePassIsInvalid
        ? `${classes["form-control"]} ${classes.invalid}`
        : `${classes["form-control"]}`;
    const emailInputClasses = enteredEmailIsInvalid
        ? `${classes["form-control"]} ${classes.invalid}`
        : `${classes["form-control"]}`;
    const passwordInputClasses = enteredPasswordIsInvalid
        ? `${classes["form-control"]} ${classes.invalid}`
        : `${classes["form-control"]}`;

    const closeHandler = (event) => {
        event.preventDefault();
        dispatch(uiActions.setUnvisible());
    };

    const signUpForm = (
        <Fragment>
            <div className={emailInputClasses}>
                <label htmlFor="email">E-mail</label>
                <input
                    type="email"
                    id="email"
                    value={enteredEmail}
                    onChange={emailInputChangeHandler}
                    onBlur={emailInputBlurHandler}
                />
                {enteredEmailIsInvalid && (
                    <p className={classes["error-text"]}>Email không hợp lệ, vui lòng kiểm tra lại!</p>
                )}
            </div>

            <div className={passwordInputClasses}>
                <label htmlFor="password">Mật khẩu</label>
                <input
                    type="password"
                    id="password"
                    value={enteredPassword}
                    onChange={passwordInputChangeHandler}
                    onBlur={passwordInputBlurHandler}
                />
                {enteredPasswordIsInvalid && <p className={classes["error-text"]}>Mật khẩu phải trên 8 ký tự!</p>}
            </div>

            <div className={rePassInputClasses}>
                <label htmlFor="re-password">Nhập lại mật khẩu</label>
                <input
                    type="password"
                    id="re-password"
                    value={enteredRePass}
                    onChange={rePassInputChangeHandler}
                    onBlur={rePassInputBlurHandler}
                />
                {enteredRePassIsInvalid && <p className={classes["error-text"]}>Mật khẩu phải trên 8 ký tự!</p>}
            </div>

            <div className={classes["form-actions"]}>
                <button className={classes.closeBtn} onClick={closeHandler}>
                    Đóng
                </button>
                <button disabled={!formIsValid}>Đăng ký</button>
            </div>
            {error && <p className={classes["error-text"]}>{error}</p>}
            <p>
                Bạn đã có tài khoản?{" "}
                <button href="#" onClick={switchLoginHandler} className={classes.btnSwitch}>
                    Đăng nhập
                </button>
            </p>
        </Fragment>
    );

    const continueHandler = () => {
        dispatch(uiActions.setUnvisible());
    };

    return (
        <Fragment>
            {!isLogin && (
                <form onSubmit={formSubmissionHandler} className={classes.loginForm}>
                    <img src={signupImg} alt="login cake" />
                    <div className={classes["control-group"]}>
                        {siginSucess && (
                            <Fragment>
                                <p className={classes["success-text"]}>
                                    Chúc mừng bạn đã đăng ký tài khoản thành công!
                                </p>
                                <div className={classes["form-actions"]}>
                                    <button onClick={continueHandler}>Tiếp tục</button>
                                </div>
                            </Fragment>
                        )}
                        {!siginSucess && signUpForm}
                    </div>
                </form>
            )}
            {isLogin && <LoginForm />}
        </Fragment>
    );
};

export default SignupForm;
