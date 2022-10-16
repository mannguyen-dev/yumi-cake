
import FlavoursCakesItem from "./FlavoursCakesItem";
import classes from "./FlavoursCakesShow.module.css";

const FlavoursCakesShow = (props) => {

    return (
        <div className={classes.container}>

            {props.Flavours.map((item) => (
                <FlavoursCakesItem key={item._id} cake={item} />
            ))}

        </div>
    );
};

export default FlavoursCakesShow;