import { Fragment, useEffect, useState } from "react";
import classes from "./ShowAllCakes.module.css";
import CakesDataService from "../../services/cake";
import CakeItem from "./CakeItem";

const ShowAllCakes = (props) => {
    const [cakes, setCakes] = useState([]);
    const [page, setPage] = useState(0);

    useEffect(() => {
        CakesDataService.getAll(20, page * 20)
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
        <Fragment>
            <div className={classes.container}>
                {cakes.map((item) => (
                    <CakeItem key={item._id} cake={item} />
                ))}
            </div>
            <div className={classes.pagePagination}>
                {page > 0 && <button onClick={backPageHandler}>{"<<"} Trước</button>}
                <button>Trang {page + 1}</button>
                {cakes.length >= 20 && <button onClick={nextPageHandler}> Sau {">>"}</button>}
            </div>
        </Fragment>
    );
};

export default ShowAllCakes;
