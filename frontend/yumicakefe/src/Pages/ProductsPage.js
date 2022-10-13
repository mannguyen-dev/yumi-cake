import { Fragment } from "react";
import ShowAllCakes from "../components/cake/ShowAllCake";

const ProductsPage = () => {
    return (
        <Fragment>
            <PopularCakes title="Phổ biến..." />
            <PopularCakes title="Đang thịnh hành..." />
        </Fragment>
    );
};

export default ProductsPage;
