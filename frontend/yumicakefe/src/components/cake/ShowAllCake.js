import { Fragment, useEffect, useState } from "react";
import classes from "./ShowAllCakes.module.css";
import CakesDataService from "../../services/cake";
import CakeItem from "./CakeItem";
import { useSelector } from "react-redux";
import Breadcumb from "../Layout/breadcumb/breadcumb";
const itemPerPage = 16;

const ShowAllCakes = (props) => {
    const searchInfo = useSelector((state) => state.search.searchInfo);
    const searchByCategory = useSelector((state) => state.search.searchByCategory);

    const [cakes, setCakes] = useState([]);
    const [page, setPage] = useState(0);

    useEffect(() => {
        if (searchInfo) {
            CakesDataService.getByName(searchInfo, itemPerPage, page * itemPerPage)
                .then((response) => {
                    setCakes(response.data);
                })
                .catch((e) => {
                    console.log(e);
                });
        } else if (searchByCategory) {
            CakesDataService.getByCategory(searchByCategory, itemPerPage, page * itemPerPage)
                .then((response) => {
                    setCakes(response.data);
                })
                .catch((e) => {
                    console.log(e);
                });
        } else {
            CakesDataService.getAll(itemPerPage, page * itemPerPage)
                .then((response) => {
                    setCakes(response.data);
                })
                .catch((e) => {
                    console.log(e);
                });
        }
    }, [page, searchInfo, searchByCategory, cakes]);

    const nextPageHandler = () => {
        setPage(page + 1);
        window.scrollTo(0, 0);
    };

    const backPageHandler = () => {
        if (page > 0) setPage(page - 1);
        window.scrollTo(0, 0);
    };

    const navigateArray = [
        {
            name: "Trang chủ",
            link: "/",
        },
        {
            name: "Khám phá",
            link: "/products",
        },
    ];

    const ascHandler = () => {
        //TODO
        console.log(cakes);
    };

    const descHandler = () => {
        //TODO
        console.log(cakes);
    };

    const searchResult = (
        <div className={classes.searchResult}>
            <div className={classes.title}>Kết quả tìm:</div>
            {searchInfo && <div>Từ khóa "{searchInfo}"</div>}
            {searchByCategory && <div>Danh mục "{searchByCategory}"</div>}
        </div>
    );

    return (
        <Fragment>
            <Breadcumb titleInfo="Khám phá" navigateArray={navigateArray} />
            {(searchByCategory || searchInfo) && searchResult}
            <div className={classes.searchResult}>
                <div className={classes.title}>Sắp xếp theo tên: </div>
                <button onClick={ascHandler}>Tăng dần</button>
                <button onClick={descHandler}>Giảm dần</button>
            </div>
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
