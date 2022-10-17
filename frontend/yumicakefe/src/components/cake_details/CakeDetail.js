import { useParams } from "react-router-dom";
import classes from "./CakeDetail.module.css";
import CakeImage from "./CakeImage";
import CakesDataService from "../../services/cake";
import { Fragment, useState } from "react";
import { useEffect } from "react";
import CakeInfo from "./CakeInfo";
import PopularCakes from "../cake/PopularCakes";
import Breadcumb from "../Layout/breadcumb/breadcumb";
import ReviewContainer from "../review/ReviewContainer";
import ReviewDataService from "../../services/review";

const CakeDetail = () => {
    const [cake, setCake] = useState(null);
    const [allReview, setAllReview] = useState(null);

    const { cakeId } = useParams(); // replace for props.match.params.id

    const getCake = (id) => {
        CakesDataService.get(id)
            .then((response) => {
                setCake(response.data);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    useEffect(() => {
        getCake(cakeId);

        ReviewDataService.getAllReviewsByProduct(cakeId)
            .then((response) => {
                setAllReview(response.data);
            })
            .catch((e) => {
                console.log(e);
            });
    }, [cakeId]);

    const navigateArray = [
        {
            name: "Trang chủ",
            link: "/",
        },
        {
            name: "Khám phá",
            link: "/products",
        },
        {
            name: "Thông tin sản phẩm",
            link: `/products/id/${cakeId}`,
        },
    ];

    const category = cake ? cake.categories[0] : null;
    let numReview;
    let rating;
    if (allReview) {
        numReview = allReview.length;

        let sum = 0;
        for (const item of allReview) {
            sum += item.stars;
        }

        rating = sum / numReview;
    }

    return (
        <Fragment>
            <Breadcumb titleInfo="Thông tin sản phẩm" navigateArray={navigateArray} />
            <section className={classes.cakeDetail}>
                <CakeImage cake={cake} />
                <CakeInfo cake={cake} numReview={numReview} rating={rating} />
            </section>
            <PopularCakes title="Có liên quan" typeCake="Category" category={category} />
            <ReviewContainer cake={cake} numReview={numReview} rating={rating} />
        </Fragment>
    );
};

export default CakeDetail;
