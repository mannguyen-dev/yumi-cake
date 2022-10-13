import React from "react";

import classes from "./SearchBar.module.css";
import searchIcon from "../../assets/search_icon.png";

const Input = React.forwardRef((props, ref) => {
    return (
        <div className={classes.input}>
            <input ref={ref} {...props.input} placeholder={props.label} />
            <button>
                <img src={searchIcon} alt="search_icon" />
            </button>
        </div>
    );
});

export default Input;
