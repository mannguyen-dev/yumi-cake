import { Fragment, useEffect, useState } from "react";
import classes from "./ShowAllCakes.module.css";
import CakesDataService from "../../services/cake";
import CakeItem from "./CakeItem";
const itemPerPage = 16;

const ShowAllCakes = (props) => {
    const [cakes, setCakes] = useState([]);
    const [page, setPage] = useState(0);

    useEffect(() => {
        CakesDataService.getAll(itemPerPage, page * itemPerPage)
            .then((response) => {
                setCakes(response.data);
            })
            .catch((e) => {
                console.log(e);
            });
    }, [page]);

    const nextPageHandler = () => {
        setPage(page + 1);
    };

    const backPageHandler = () => {
        if (page > 0) setPage(page - 1);
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
                {cakes.length >= itemPerPage && <button onClick={nextPageHandler}> Sau {">>"}</button>}
            </div>
        </Fragment>
    );
};

export default ShowAllCakes;
