import classes from "./CartItem.module.css";
import { useDispatch } from "react-redux";
import { cartActions } from "../../store/cart-slice";
import { formatCurrency } from "../../utility/FormatCurrency";

const CartItem = (props) => {
    const { title, quantity, total, price, id, weight, message } = props.item;

    const dispatch = useDispatch();

    const removeItemHandler = () => {
        dispatch(cartActions.removeItemFromCart({ id, weight, message }));
    };

    const addItemHandler = () => {
        dispatch(cartActions.addItemToCart({ id, title, price, weight, message }));
    };

    const titleFixed = title.length < 22 ? `${title}` : `${title.slice(0, 22)}...`;

    return (
        <li className={classes.item}>
            <header>
                <h3>{titleFixed}</h3>
                <div className={classes.price}>
                    {formatCurrency.format(total)}{" "}
                    <span className={classes.itemprice}>
                        ({formatCurrency.format(price)} / {weight.toFixed(1)} kg)
                    </span>
                </div>
            </header>
            <div className={classes.details}>
                <div className={classes.quantity}>
                    x <span>{quantity}</span>
                </div>
                <div className={classes.actions}>
                    <button onClick={removeItemHandler}>-</button>
                    <button onClick={addItemHandler}>+</button>
                </div>
            </div>
            <div>Lời nhắn: {message ? message : "Không có"}</div>
        </li>
    );
};

export default CartItem;
