import classes from "./CakeItem.module.css";
import { BACKEND_URL } from "../../utility/Constants";
import { useHistory } from "react-router-dom";
import { formatCurrency } from "../../utility/FormatCurrency";
import { cartActions } from "../../store/cart-slice";
import { useDispatch } from "react-redux";

const CakeItem = (props) => {
    // console.log(props);
    const history = useHistory();
    const dispatch = useDispatch();

    const seeMoreHandler = () => {
        history.push(`/products/id/${props.cake._id}`);
        window.scrollTo(0, 0);
    };

    const imageUrl = `${BACKEND_URL}/products/id/${props.cake._id}/images/0`;

    const cake = props.cake;

    const name = cake.name.length < 20 ? `${cake.name}` : `${cake.name.slice(0, 20)}...`;
    const description = `${cake.description.slice(0, 56)}...`;

    const addToCartHandler = () => {
        dispatch(
            cartActions.addItemToCart({
                name: cake.name,
                product_id: cake._id,
                weight: cake.sizes[0].weight,
                price: cake.sizes[0].price,
                message: " ",
            })
        );
    };

    return (
        <div className={classes.cakeItem}>
            <div className={classes.cakeImage}>
                <img src={imageUrl} alt="Cake's in card" />
            </div>
            <div>
                <p className={classes.name}>{name}</p>
                <p className={classes.description}>{description}</p>
                <div className={classes.price}>
                    {formatCurrency.format(cake.sizes[0].price)} <span>/ {cake.sizes[0].weight.toFixed(1)} kg</span>
                </div>
                <button className={`${classes.button} ${classes.addToCart}`} onClick={addToCartHandler}>
                    Thêm vào giỏ
                </button>
                <button className={`${classes.button} ${classes.seeMore}`} onClick={seeMoreHandler}>
                    Xem thêm
                </button>
            </div>
        </div>
    );
};

export default CakeItem;
