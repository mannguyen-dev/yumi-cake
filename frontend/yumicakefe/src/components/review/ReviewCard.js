import classes from "./ReviewCard.module.css";

const ReviewCard = () => {
    return (
        <div className={classes.reviewCard}>
            <div className={classes.reviewContent}>
                <div className={classes.title}>
                    <h4>Title</h4>
                    <div className={classes.star}>★ 4.9</div>
                </div>
                <hr className={classes.rounded}></hr>
                <div className={classes.content}>Contentalkfn asflngaklg alnfglkngk asnlkgnaskgn salkngkla</div>
            </div>
            <div className={classes.reviewInfo}>
                <div className={classes.name}>Man Nguyen</div>

                <div className={classes.date}>
                    <p>Date:</p>
                    <div>2022-10-22</div>
                </div>
            </div>
        </div>
    );
};
export default ReviewCard;
