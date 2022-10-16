import { Fragment } from "react";
import FlavoursCakes from "../../components/cake/FlavoursCakes";
import PopularCakes from "../../components/cake/PopularCakes";
import SliderCake from "../../components/cake/SliderCake";

const Home = () => {
  return (
    <div>
      <Fragment>
        <SliderCake />
        <FlavoursCakes title = "Trải nghiệm hương vị"/>
        <PopularCakes title="Phổ biến..." />
        <PopularCakes title="Đang thịnh hành..." />
      </Fragment>
    </div>
  );
};

export default Home;
