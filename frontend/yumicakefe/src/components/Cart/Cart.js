import classes from "./Cart.module.css";
import CartItem from "./CartItem";

import { useSelector } from "react-redux";

const Cart = (props) => {
    const cartItems = useSelector((state) => state.cart.items);
    return (
        <div className={classes.cart}>
            <h2>Giỏ hàng của bạn</h2>
            <ul>
                {cartItems.map((item) => (
                    <CartItem
                        key={item.id}
                        item={{
                            id: item.id,
                            title: item.name,
                            quantity: item.quantity,
                            total: item.totalPrice,
                            price: item.price,
                        }}
                    />
                ))}
            </ul>
        </div>
    );
};

export default Cart;
