import { useEffect, useState } from "react";
import CakeContainer from "./CakeContainer";
import classes from "./PopularCakes.module.css";
import CakesDataService from "../../services/cake";

const CakeSection = (props) => {
    const [cakes, setCakes] = useState([]);
    const [page, setPage] = useState(0);
    const typeCake = props.typeCake;
    const category = props.category;

    useEffect(() => {
        if (typeCake === "Category") {
            CakesDataService.getByCategory(category, 4, page * 4)
                .then((response) => {
                    setCakes(response.data);
                    // console.log(response.data);
                })
                .catch((e) => {
                    console.log(e);
                });
        } else if (typeCake === "Trending") {
            CakesDataService.getNew(4, page * 4)
                .then((response) => {
                    setCakes(response.data);
                })
                .catch((e) => {
                    console.log(e);
                });
        } else if (typeCake === "Popular") {
            CakesDataService.getPopular(4, page * 4)
                .then((response) => {
                    setCakes(response.data);
                    // console.log(response.data);
                })
                .catch((e) => {
                    console.log(e);
                });
        } else {
            CakesDataService.getAll(4, page * 4)
                .then((response) => {
                    setCakes(response.data);
                })
                .catch((e) => {
                    console.log(e);
                });
        }
    }, [page, typeCake, category]);

    const nextPageHandler = () => {
        if (cakes.length >= 4) setPage(page + 1);
    };

    const backPageHandler = () => {
        if (page > 0) setPage(page - 1);
    };

    return (
        <section className={classes.container}>
            <h2>{props.title}</h2>
            <CakeContainer cakes={cakes} onNextPage={nextPageHandler} onBackPage={backPageHandler} page={page} />
        </section>
    );
};

export default CakeSection;
