import classes from "./FlavoursCakesItem.module.css";
import { url } from "../../services/cake";
import { Link } from "react-router-dom";

const FlavoursCakesItem = (props) => {

    const imageUrl = `${url}/products/id/${props.cake._id}/images/0`;

    const name = props.cake.name.length < 18 ? `${props.cake.name}` : `${props.cake.name.slice(0, 18)}...`;
    const categories = `${props.cake.categories}`;

    return (
        <div>
            <Link to={"/products"}>
                <div className={classes.cakeImage}>
                    <img src={imageUrl} alt="Cake's in card" />
                </div>
                <div className={classes.cakeItem}>
                    <p className={classes.name}>{name.slice(0, 5)}</p>
                    <p >{categories}</p>
                </div>
            </Link>
        </div>
    );
};

export default FlavoursCakesItem;