import React from "react";
import Carousel from "react-bootstrap/Carousel";
import { Link } from "react-router-dom";

function SliderCake() {
    return (
        <Carousel>
            <Carousel.Item interval={1500}>
                <Link to="/products">
                    <img
                        className="d-block w-100"
                        src={"https://media.bakingo.com/60_min_delivery_bk_hp_banner_d_n.jpg"}
                        alt="First slide"
                    />
                </Link>
            </Carousel.Item>
            <Carousel.Item interval={1000}>
                <Link to="/products">
                    <img
                        className="d-block w-100"
                        src="https://media.bakingo.com/kids_cake_bk_hp_banner_d.jpg"
                        alt="Second slide"
                    />
                </Link>
            </Carousel.Item>
            <Carousel.Item interval={500}>
                <Link to="/products">
                    <img
                        className="d-block w-100"
                        src="https://media.bakingo.com/boss_day_bk_hp_banner_d.jpg"
                        alt="Third slide"
                    />
                </Link>
            </Carousel.Item>
            <Carousel.Item>
                <Link to="/products">
                    <img
                        className="d-block w-100"
                        src="https://media.bakingo.com/heavenly_cake_bk_hp_banner_d_0.jpg"
                        alt="Third slide"
                    />
                </Link>
            </Carousel.Item>
        </Carousel>
    );
}

export default SliderCake;
