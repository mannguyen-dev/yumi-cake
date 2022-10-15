import useInput from "../../hooks/use-input";
import classes from "./LoginForm.module.css";
import loginImg from "../../assets/loginCake.jpg";
import { uiActions } from "../../store/ui-slice";
import { useDispatch } from "react-redux";
import { Fragment, useState } from "react";
import { userActions } from "../../store/user-slice";
import UserDataService from "../../services/user";
import SignupForm from "./SignupForm";

const validateEmail = (value) => value.includes("@");
const validatePassword = (value) => value.length >= 8;

const LoginForm = (props) => {
    const dispatch = useDispatch();

    const [error, setError] = useState(null);
    const [isSignup, setIsSignup] = useState(false);

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

    let formIsValid = false;

    if (enteredPasswordIsValid && enteredEmailIsValid) {
        formIsValid = true;
    }

    const formSubmissionHandler = async (event) => {
        event.preventDefault();

        if (!formIsValid) {
            return;
        }

        try {
            const response = UserDataService.login(enteredEmail, enteredPassword);

            const responseData = await Promise.resolve(response);

            resetPasswordInput();
            resetEmailInput();

            dispatch(userActions.login({ user: responseData.data.user, authToken: responseData.data.token }));

            dispatch(uiActions.setUnvisible());
        } catch (error) {
            setError("Email hoặc mật khẩu sai vui lòng kiểm tra lại!");
            console.log(error);
        }
    };

    const signupHandler = (event) => {
        event.preventDefault();
        setIsSignup(true);
    };

    const emailInputClasses = enteredEmailIsInvalid
        ? `${classes["form-control"]} ${classes.invalid}`
        : `${classes["form-control"]}`;
    const passwordInputClasses = enteredPasswordIsInvalid
        ? `${classes["form-control"]} ${classes.invalid}`
        : `${classes["form-control"]}`;

    return (
        <Fragment>
            {!isSignup && (
                <form onSubmit={formSubmissionHandler} className={classes.loginForm}>
                    <img src={loginImg} alt="login cake" />
                    <div className={classes["control-group"]}>
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
                            {enteredPasswordIsInvalid && (
                                <p className={classes["error-text"]}>Mật khẩu phải trên 8 ký tự!</p>
                            )}
                        </div>
                        <div className={classes["form-actions"]}>
                            <button disabled={!formIsValid}>Đăng nhập</button>
                        </div>
                        {error && <p className={classes["error-text"]}>{error}</p>}
                        <p>
                            Nếu chưa có tài khoản, hãy{" "}
                            <button onClick={signupHandler} className={classes.btnSwitch}>
                                Đăng ký
                            </button>{" "}
                            ngay!
                        </p>
                    </div>
                </form>
            )}
            {isSignup && <SignupForm />}
        </Fragment>
    );
};

export default LoginForm;
