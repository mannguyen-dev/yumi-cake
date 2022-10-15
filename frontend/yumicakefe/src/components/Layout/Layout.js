import { Fragment } from "react";
import classes from "./Layout.module.css";
import MainNavigation from "./header/MainNavigation";
import SubNavigation from "./header/SubNavigation";

const Layout = (props) => {
    return (
        <Fragment>
            <MainNavigation />
            {/* <SubNavigation /> */}
            <main className={classes.main}>{props.children}</main>
        </Fragment>
    );
};

export default Layout;
