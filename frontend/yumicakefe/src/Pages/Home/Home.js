import { Fragment } from "react";
import PopularCakes from "../../components/cake/PopularCakes";

const Home = () => {
    return (
        <Fragment>
            <PopularCakes title="Phổ biến..." />
            <PopularCakes title="Đang thịnh hành..." />
        </Fragment>
    );
};

export default Home;
