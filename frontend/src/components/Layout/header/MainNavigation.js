import { NavLink } from "react-router-dom";
import classes from "./MainNavigation.module.css";
import SearchBar from "../../UI/SearchBar";
import { Fragment, useRef } from "react";
import HeaderCartButton from "./HeaderCartButton";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../../../store/ui-slice";
import { userActions } from "../../../store/user-slice";
import { cartActions } from "../../../store/cart-slice";
import { searchActions } from "../../../store/search-slide";

const MainNavigation = () => {
    const inputRef = useRef();

    const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

    const dispatch = useDispatch();
    const loginToggleHandler = (event) => {
        event.preventDefault();
        dispatch(uiActions.showLogin());
    };

    const logoutToggleHandler = (event) => {
        event.preventDefault();
        dispatch(userActions.logout());
        dispatch(uiActions.setUnvisible());
        dispatch(
            cartActions.replaceCart({
                items: [],
                totalQuantity: 0,
                location: null,
                changed: false,
            })
        );
    };

    let userLink;

    if (!isLoggedIn) {
        userLink = (
            <NavLink to="/home" onClick={loginToggleHandler}>
                Đăng nhập
            </NavLink>
        );
    } else {
        userLink = (
            <NavLink to="/home" onClick={logoutToggleHandler}>
                Đăng xuất
            </NavLink>
        );
    }

    const resetSearchDispatch = () => {
        dispatch(searchActions.setSearchFalse());
    };

    return (
        <Fragment>
            <div className={classes.sticky}></div>
            <header className={classes.header}>
                <NavLink to="/home" className={classes.logo}>
                    Yumi Cake
                </NavLink>
                <SearchBar ref={inputRef} input={{ id: "a" }} label="Tìm kiếm" />
                <nav className={classes.nav}>
                    <ul>
                        <li>
                            <NavLink to="/products" onClick={resetSearchDispatch} activeClassName={classes.active}>
                                Khám phá
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/about" activeClassName={classes.active}>
                                Giới thiệu
                            </NavLink>
                        </li>
                        <li>{userLink}</li>
                        {isLoggedIn && (
                            <li>
                                <HeaderCartButton />
                            </li>
                        )}
                    </ul>
                </nav>
            </header>
        </Fragment>
    );
};

export default MainNavigation;
