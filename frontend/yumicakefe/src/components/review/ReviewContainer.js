import { useDispatch, useSelector } from "react-redux";
import ReviewCard from "./ReviewCard";
import classes from "./ReviewContainer.module.css";
import StarRatings from "react-star-ratings";
import { useEffect, useState } from "react";
import { uiActions } from "../../store/ui-slice";
import useInput from "../../hooks/use-input";
import ReviewDataService from "../../services/review";

const itemPerPage = 5;

const validateTitle = (value) => value.length > 0 && value.length < 30;
const validateContent = (value) => value.length > 0;

const ReviewContainer = (props) => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
    const authToken = useSelector((state) => state.user.authToken);

    const [reviewPage, setReviewPage] = useState(0);
    const [reviews, setReviews] = useState([]);
    const [isSendingReview, setIsSendingReview] = useState(false);

    const [state, setState] = useState(0);
    const cakeId = props.cake ? props.cake._id : null;

    useEffect(() => {
        if (!cakeId) return;

        ReviewDataService.getReviewsByProduct(cakeId, itemPerPage, reviewPage * itemPerPage)
            .then((response) => {
                setReviews(response.data);
            })
            .catch((e) => {
                console.log(e);
            });
    }, [reviewPage, cakeId, isSendingReview]);

    // console.log(reviews);

    const {
        value: enteredContent,
        isValid: enteredContentIsValid,
        hasError: enteredContentIsInvalid,
        valueChangeHandler: contentInputChangeHandler,
        inputBlurHandler: contentInputBlurHandler,
        reset: resetContentInput,
    } = useInput(validateContent);

    const {
        value: enteredTitle,
        isValid: enteredTitleIsValid,
        hasError: enteredTitleIsInvalid,
        valueChangeHandler: titleInputChangeHandler,
        inputBlurHandler: titleInputBlurHandler,
        reset: resetTitleInput,
    } = useInput(validateTitle);

    let formIsValid = false;

    if (enteredContentIsValid && enteredTitleIsValid && state) {
        formIsValid = true;
    }

    const changeRating = (newRating, name) => {
        setState({
            rating: newRating,
        });
    };

    const loginHandler = (e) => {
        e.preventDefault();
        dispatch(uiActions.showLogin());
    };

    const submitReviewHandler = async (e) => {
        setIsSendingReview(true);
        e.preventDefault();

        const response = ReviewDataService.postReview(
            props.cake._id,
            enteredTitle,
            enteredContent,
            state.rating,
            authToken
        );

        await Promise.resolve(response);
        // console.log(responseData);

        resetContentInput();
        resetTitleInput();
        setReviewPage(0);
        setState({
            rating: 0,
        });
        setIsSendingReview(false);
    };

    const nextPageHandler = () => {
        setReviewPage(reviewPage + 1);
    };

    const backPageHandler = () => {
        if (reviewPage > 0) setReviewPage(reviewPage - 1);
    };

    const titleInputClasses = enteredTitleIsInvalid
        ? `${classes["form-control"]} ${classes.invalid} ${classes.item}`
        : `${classes["form-control"]} ${classes.item}`;
    const contentInputClasses = enteredContentIsInvalid
        ? `${classes["form-control"]} ${classes.invalid} ${classes.item}`
        : `${classes["form-control"]} ${classes.item}`;

    return (
        <section id="reviews" className={classes.container}>
            <h2>Bình luận</h2>
            <div className={classes.reviewContainer}>
                <div>
                    {reviews.map((item) => (
                        <ReviewCard key={item._id} review={item} />
                    ))}
                    {reviews.length === 0 && (
                        <div className={classes.text}>Hãy là người đầu tiên đánh giá cho sản phẩm này!</div>
                    )}
                    {reviews.length !== 0 && (
                        <div className={classes.pagePagination}>
                            {reviewPage > 0 && <button onClick={backPageHandler}>{"<<"}</button>}
                            <button>{reviewPage + 1}</button>
                            {reviews.length >= itemPerPage && <button onClick={nextPageHandler}> {">>"}</button>}
                        </div>
                    )}
                </div>
                <div className={classes.myReview}>
                    <div className={classes.rate}>
                        <div className={classes.star}>★ {props.rating ? props.rating.toFixed(1) : "..."}</div>
                        <a href="#reviews">{props.numReview} đánh giá </a>
                        <div />
                    </div>

                    <div className={classes.title}>Bình luận của bạn</div>

                    {isLoggedIn && (
                        <form className={classes.formReview} onSubmit={submitReviewHandler}>
                            <div className={classes.item}>
                                <label>Đánh giá</label>
                                <StarRatings
                                    rating={state.rating}
                                    starRatedColor="#ffa94d"
                                    changeRating={changeRating}
                                    numberOfStars={5}
                                    name="rating"
                                />
                            </div>

                            <div className={titleInputClasses}>
                                <label htmlFor="content">Tiêu đề</label>
                                <input
                                    type="text"
                                    id="content"
                                    value={enteredTitle}
                                    onChange={titleInputChangeHandler}
                                    onBlur={titleInputBlurHandler}
                                    placeholder="Nhập nội dung đánh giá"
                                />
                                {enteredTitleIsInvalid && (
                                    <p className={classes["error-text"]}>
                                        Vui lòng nhập tiêu đề, tiêu đề không quá 30 ký tự!
                                    </p>
                                )}
                            </div>

                            <div className={contentInputClasses}>
                                <label htmlFor="content">Nội dung</label>
                                <textarea
                                    type="text"
                                    id="content"
                                    value={enteredContent}
                                    onChange={contentInputChangeHandler}
                                    onBlur={contentInputBlurHandler}
                                    placeholder="Nhập nội dung đánh giá"
                                />
                                {enteredContentIsInvalid && (
                                    <p className={classes["error-text"]}>Vui lòng nhập nội dung!</p>
                                )}
                            </div>
                            <div className={classes["form-actions"]}>
                                <button disabled={!formIsValid}>Gửi</button>
                            </div>
                        </form>
                    )}
                    {!isLoggedIn && (
                        <div className={classes.text}>
                            Vui lòng{" "}
                            <a href="#none" onClick={loginHandler}>
                                Đăng nhập
                            </a>{" "}
                            để thêm bình luận của bạn!
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default ReviewContainer;
