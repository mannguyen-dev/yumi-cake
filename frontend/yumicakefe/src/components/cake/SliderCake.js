import React from "react";
import Carousel from "react-bootstrap/Carousel";
import { Link } from "react-router-dom";
import slideImg1 from "../../assets/slider/Slide_1.jpg";
import slideImg2 from "../../assets/slider/Slide_2.jpg";
import slideImg3 from "../../assets/slider/Slide_3.jpg";
import slideImg4 from "../../assets/slider/Slide_4.jpg";

function SliderCake() {
    return (
        <Carousel>
            <Carousel.Item interval={1500}>
                <Link to="/products">
                    <img className="d-block w-100" src={slideImg1} alt="First slide" />
                </Link>
            </Carousel.Item>
            <Carousel.Item interval={1000}>
                <Link to="/products">
                    <img className="d-block w-100" src={slideImg2} alt="Second slide" />
                </Link>
            </Carousel.Item>
            <Carousel.Item interval={500}>
                <Link to="/products">
                    <img className="d-block w-100" src={slideImg3} alt="Third slide" />
                </Link>
            </Carousel.Item>
            <Carousel.Item>
                <Link to="/products">
                    <img className="d-block w-100" src={slideImg4} alt="Third slide" />
                </Link>
            </Carousel.Item>
        </Carousel>
    );
}

export default SliderCake;
