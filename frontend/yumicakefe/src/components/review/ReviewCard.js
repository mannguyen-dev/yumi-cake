import classes from "./ReviewCard.module.css";
import UserDataService from "../../services/user";
import { useEffect, useState } from "react";
import moment from "moment";

const ReviewCard = (props) => {
    const [user, setUser] = useState(null);

    const userId = props.review.user_id;

    const getUser = (id) => {
        UserDataService.getUserById(id)
            .then((response) => {
                setUser(response.data);
                // console.log(response.data);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    useEffect(() => {
        getUser(userId);
    }, [userId]);

    if (!user) return;

    return (
        <div className={classes.reviewCard}>
            <div className={classes.reviewContent}>
                <div className={classes.title}>
                    <h4>{props.review.title}</h4>
                    <div className={classes.star}>★ {props.review.stars.toFixed(1)}</div>
                </div>
                <hr className={classes.rounded}></hr>
                <div className={classes.content}>{props.review.content}</div>
            </div>
            <div className={classes.reviewInfo}>
                <div className={classes.name}>{user.email}</div>

                <div className={classes.date}>
                    <div>{moment(props.review.date).format("hh:mm - DD/MM/YYYY ")}</div>
                </div>
            </div>
        </div>
    );
};
export default ReviewCard;
