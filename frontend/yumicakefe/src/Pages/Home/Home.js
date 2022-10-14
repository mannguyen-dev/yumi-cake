import { Fragment } from "react";
import PopularCakes from "../../components/cake/PopularCakes";
import SliderCake from "../../components/cake/SliderCake";

const Home = () => {
  return (
    <div>
      <Fragment>
        <SliderCake />
        <PopularCakes title="Phổ biến..." />
        <PopularCakes title="Đang thịnh hành..." />
      </Fragment>
    </div>
  );
};

export default Home;
