import { NavLink } from "react-router-dom";
import classes from "./MainNavigation.module.css";
import SearchBar from "../../UI/SearchBar";
import { Fragment, useRef } from "react";
import HeaderCartButton from "./HeaderCartButton";

const MainNavigation = () => {
    const inputRef = useRef();

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
                            <NavLink to="/products" activeClassName={classes.active}>
                                Khám phá
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/about" activeClassName={classes.active}>
                                Liên hệ
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/login" activeClassName={classes.active}>
                                Đăng nhập
                            </NavLink>
                        </li>
                        <li>
                            <HeaderCartButton />
                        </li>
                    </ul>
                </nav>
            </header>
        </Fragment>
    );
};

export default MainNavigation;
