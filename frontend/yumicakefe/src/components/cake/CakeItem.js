import classes from "./CakeItem.module.css";
import { url } from "../../services/cake";

const CakeItem = (props) => {
    // console.log(props);

    const imageUrl = `${url}/products/id/${props.cake._id}/images/0`;

    const name = props.cake.name.length < 18 ? `${props.cake.name}` : `${props.cake.name.slice(0, 18)}...`;
    const description = `${props.cake.description.slice(0, 60)}...`;

    return (
        <div className={classes.cakeItem}>
            <div className={classes.cakeImage}>
                <img src={imageUrl} alt="Cake's in card" />
            </div>
            <div>
                <p className={classes.name}>{name}</p>
                <p className={classes.description}>{description}</p>
                <div className={classes.price}>
                    {props.cake.sizes[0].price} VNĐ <span>/{props.cake.sizes[0].weight} kg</span>
                </div>
                <button className={`${classes.button} ${classes.addToCart}`}>Thêm vào giỏ</button>
                <button className={`${classes.button} ${classes.seeMore}`}>Xem thêm</button>
            </div>
        </div>
    );
};

export default CakeItem;
