import { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { cartActions } from "../../store/cart-slice";
import { uiActions } from "../../store/ui-slice";
import classes from "./CakeInfo.module.css";
import { formatCurrency } from "../../utility/FormatCurrency";
import { Link } from "react-router-dom";
import { searchActions } from "../../store/search-slide";

const CakeInfo = (props) => {
    const cake = props.cake;
    const dispatch = useDispatch();
    const messageRef = useRef();
    const locationRef = useRef();
    const [price, setPrice] = useState(0);
    const [weight, setWeight] = useState(0);
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

    if (!cake) {
        return;
    }

    if (price === 0 && weight === 0) {
        setPrice(cake.sizes[0].price);
        setWeight(cake.sizes[0].weight);
    }

    const selectWeightHandler = (el) => {
        const weightInput = Number(el.target.value);
        const size = cake.sizes.find((item) => item.weight === weightInput);
        setPrice(size.price);
        setWeight(size.weight);
    };

    const orderHandler = (event) => {
        event.preventDefault();
        if (!isLoggedIn) {
            dispatch(uiActions.showLogin());
        }
        dispatch(
            cartActions.addItemToCart({
                cake,
                weight,
                price,
                message: messageRef.current.value,
                location: locationRef.current.value,
                id: cake._id,
            })
        );
    };

    const searchByCategoryHandler = (event) => {
        const searchByCategory = event.target.innerText.slice(0, -2);
        dispatch(searchActions.setCategory({ searchByCategory }));
    };

    return (
        <div className={classes.cakeInfoContainer}>
            <h2>{cake.name}</h2>

            <div className={classes.rate}>
                <div className={classes.star}>★ 4.9</div>
                <a href>20 đánh giá </a>
            </div>
            <div className={classes.price}>
                {formatCurrency.format(price)} <span> / {weight.toFixed(1)} kg</span>
            </div>
            <div className={classes.selectWeight}>
                <div>Chọn khối lượng</div>
                <div>
                    {cake.sizes.map((item) => (
                        <button key={Math.random()} value={item.weight} onClick={selectWeightHandler}>
                            {item.weight.toFixed(1)} kg
                        </button>
                    ))}
                </div>
            </div>
            <form className={classes.orderForm} onSubmit={orderHandler}>
                <div className={classes.input}>
                    <label htmlFor="message">Lời nhắn gửi</label>
                    <input ref={messageRef} placeholder="Nhập tối đa 25 ký tự" id="message" />
                </div>
                <div className={classes.input}>
                    <label htmlFor="location">Nơi nhận</label>
                    <input ref={locationRef} placeholder="Nhập địa chỉ" id="location" />
                </div>
                <button type="submit">
                    <p>MUA NGAY</p>
                    <span>(Vui lòng đặt trước 8PM)</span>
                </button>
            </form>
            <hr className={classes.rounded}></hr>
            <div className={classes.description}>
                <h3>Mô tả sản phẩm</h3>
                <div>{cake.description}</div>
            </div>
            <div className={classes.categories}>
                <span>Danh mục: </span>
                {cake.categories.map((item) => (
                    <Link
                        to={`/products?category=${item}`}
                        href
                        key={Math.random()}
                        onClick={searchByCategoryHandler}
                        className={classes.categories}
                    >
                        {item}
                        {", "}
                    </Link>
                ))}
                ...
            </div>
        </div>
    );
};

export default CakeInfo;
