import classes from "./Cart.module.css";
import CartItem from "./CartItem";

import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../../store/ui-slice";
import { Fragment } from "react";
import { formatCurrency } from "../../utility/FormatCurrency";

const Cart = (props) => {
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);
    const cartItems = useSelector((state) => state.cart.items);

    const closeHandler = () => {
        dispatch(uiActions.setUnvisible());
    };

    const orderHandler = () => {
        console.log(cart);
    };

    let total = 0;
    cart.items.forEach((item) => {
        total += item.totalPrice;
    });

    return (
        <div className={classes.cart}>
            <h2>Giỏ hàng của bạn</h2>
            <ul>
                {cartItems.map((item) => (
                    <CartItem
                        key={Math.random()}
                        item={{
                            id: item.id,
                            title: item.name,
                            quantity: item.quantity,
                            total: item.totalPrice,
                            price: item.price,
                            weight: item.weight,
                            message: item.message,
                        }}
                    />
                ))}
            </ul>
            {cart.items.length !== 0 && (
                <Fragment>
                    <div className={classes.total}>
                        <div>Tạm tính: </div>
                        <div className={classes.totalInfo}>
                            <span className={classes.totalQuantity}> Số lượng: {cart.totalQuantity}</span>
                            <span className={classes.totalPrice}>{formatCurrency.format(total)}</span>
                        </div>
                    </div>
                    <div className={classes.order}>
                        <button className={classes.close} onClick={closeHandler}>
                            Đóng
                        </button>
                        <button onClick={orderHandler}>Đặt hàng</button>
                    </div>
                </Fragment>
            )}
            {cart.items.length === 0 && <div className={classes.empty}>** Bạn chưa thêm sản phẩm nào!</div>}
        </div>
    );
};

export default Cart;
