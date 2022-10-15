import { useParams } from "react-router-dom";
import classes from "./CakeDetail.module.css";
import CakeImage from "./CakeImage";
import CakesDataService from "../../services/cake";
import { Fragment, useState } from "react";
import { useEffect } from "react";
import CakeInfo from "./CakeInfo";
import PopularCakes from "../cake/PopularCakes";

const CakeDetail = () => {
    const [cake, setCake] = useState(null);

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
    }, [cakeId]);

    return (
        <Fragment>
            <section className={classes.cakeDetail}>
                <CakeImage cake={cake} />
                <CakeInfo cake={cake} />
            </section>
            <PopularCakes title="Có liên quan" />
        </Fragment>
    );
};

export default CakeDetail;
