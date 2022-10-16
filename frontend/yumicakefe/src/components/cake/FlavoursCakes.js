import { useEffect, useState } from "react";
import FlavoursCakesShow from "./FlavoursCakesShow";
import classes from "./FlavoursCakes.module.css";
import CakesDataService from "../../services/cake";

const FlavoursCakes = (props) => {
    const [Flavours, setFlavours] = useState([]);

    useEffect(() => {
        CakesDataService.getAll()
            .then((response) => {
                setFlavours(response.data);
            })
            .catch((e) => {
                console.log(e);
            });
    }, []);


    return (
        <div className={classes.container}>
            <h2>{props.title}</h2>
            <FlavoursCakesShow Flavours={Flavours}/>
        </div>
    );
};

export default FlavoursCakes;