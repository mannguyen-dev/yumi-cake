import { NavLink } from "react-router-dom";
import classes from "./breadcumb.module.css";

const Breadcumb = (props) => {
    return (
        <section className={classes.corporatebanner}>
            <div>{props.titleInfo}</div>
            <div className={classes.navigateArray}>
                {props.navigateArray &&
                    props.navigateArray.map((item) => (
                        <NavLink to={item.link} activeClassName={classes.active}>
                            {item.name} {">"}
                        </NavLink>
                    ))}
            </div>
        </section>
    );
};

export default Breadcumb;
