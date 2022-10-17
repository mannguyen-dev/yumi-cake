import CakeItem from "./CakeItem";
import classes from "./CakeContainer.module.css";

const CakeContainer = (props) => {
    const isEndList = props.cakes.length < 4;
    const isBeginList = props.page === 0;

    console.log(props.cakes);

    return (
        <div className={classes.cakeContainer}>
            {!isBeginList && (
                <div className={`${classes.arrow} ${classes.left}`}>
                    <button onClick={props.onBackPage}>{"<"}</button>
                </div>
            )}
            {props.cakes.map((item) => (
                <CakeItem key={Math.random()} cake={item} />
            ))}
            {!isEndList && (
                <div className={`${classes.arrow} ${classes.right}`}>
                    <button onClick={props.onNextPage}>{">"}</button>
                </div>
            )}
        </div>
    );
};

export default CakeContainer;
