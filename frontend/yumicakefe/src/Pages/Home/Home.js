import { Fragment } from "react";
import PopularCakes from "../../components/cake/PopularCakes";
import SliderCake from "../../components/cake/SliderCake";

const Home = () => {
    return (
        <div>
            <Fragment>
                <SliderCake />
                <PopularCakes title="Phổ biến" typeCake="Popular" />
                <PopularCakes title="Đang thịnh hành" typeCake="Trending" />
            </Fragment>
        </div>
    );
};

export default Home;
