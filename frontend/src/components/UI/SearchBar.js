import React, { useRef } from "react";

import classes from "./SearchBar.module.css";
import searchIcon from "../../assets/search_icon.png";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { searchActions } from "../../store/search-slide";

const Input = React.forwardRef((props, ref) => {
    const searchRef = useRef();
    const dispatch = useDispatch();
    const history = useHistory();

    const searchHandler = (e) => {
        e.preventDefault();
        if (searchRef.current.value) {
            history.push(`/products?name=${searchRef.current.value}`);
            dispatch(searchActions.setSearch({ searchInfo: searchRef.current.value }));
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            if (searchRef.current.value) {
                history.push(`/products?name=${searchRef.current.value}`);
                dispatch(searchActions.setSearch({ searchInfo: searchRef.current.value }));
            }
        }
    };

    return (
        <form className={classes.input} onSubmit={searchHandler}>
            <input type="text" onKeyDown={handleKeyDown} ref={searchRef} {...props.input} placeholder={props.label} />
            <button type="submit">
                <img src={searchIcon} alt="search_icon" />
            </button>
        </form>
    );
});

export default Input;
