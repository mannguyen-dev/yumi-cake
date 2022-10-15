import { useState } from "react";
import classes from "./CakeImage.module.css";

const CakeImage = (props) => {
    const [bigImage, setBigImage] = useState(null);

    if (!props.cake) {
        return;
    }
    const images = props.cake.images;

    if (!bigImage) setBigImage(images[0]);

    const changeImageHandler0 = () => {
        setBigImage(images[0]);
    };

    const changeImageHandler1 = () => {
        setBigImage(images[1]);
    };

    const changeImageHandler2 = () => {
        setBigImage(images[2]);
    };

    const changeImageHandler3 = () => {
        setBigImage(images[3]);
    };

    return (
        <div className={classes.imagesContainer}>
            <div className={classes.bigImage}>
                <img src={bigImage} alt="big cake" />
            </div>
            <div className={classes.smallImage}>
                <button key={Math.random()} image={images[0]} onClick={changeImageHandler0}>
                    <img src={images[0]} alt="small cake" />
                </button>
                <button key={Math.random()} image={images[1]} onClick={changeImageHandler1}>
                    <img src={images[1]} alt="small cake" />
                </button>
                <button key={Math.random()} image={images[2]} onClick={changeImageHandler2}>
                    <img src={images[2]} alt="small cake" />
                </button>
                <button key={Math.random()} image={images[3]} onClick={changeImageHandler3}>
                    <img src={images[3]} alt="small cake" />
                </button>
            </div>
        </div>
    );
};

export default CakeImage;
