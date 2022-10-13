import { useEffect, useState } from "react";
import CakeContainer from "./CakeContainer";
import classes from "./PopularCakes.module.css";
import CakesDataService from "../../services/cake";

const PopularCakes = (props) => {
    const [cakes, setCakes] = useState([]);
    const [page, setPage] = useState(0);

    useEffect(() => {
        CakesDataService.getAll(4, page * 4)
            .then((response) => {
                setCakes(response.data);
            })
            .catch((e) => {
                console.log(e);
            });
    }, [page]);

    const nextPageHandler = () => {
        if (cakes.length >= 4) setPage(page + 1);
        console.log(page);
    };

    const backPageHandler = () => {
        if (page > 0) setPage(page - 1);
        console.log(page);
    };

    return (
        <div className={classes.container}>
            <h2>{props.title}</h2>
            <CakeContainer cakes={cakes} onNextPage={nextPageHandler} onBackPage={backPageHandler} page={page} />
        </div>
    );
};

export default PopularCakes;
