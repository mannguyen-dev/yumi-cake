import { Fragment } from "react";
import CakeSection from "../components/cake/CakeSection";
import SliderCake from "../components/cake/SliderCake";

const Home = () => {
    return (
        <div>
            <Fragment>
                <SliderCake />
                <CakeSection title="Phổ biến" typeCake="Popular" />
                <CakeSection title="Đang thịnh hành" typeCake="Trending" />
            </Fragment>
        </div>
    );
};

export default Home;
