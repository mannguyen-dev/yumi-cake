import axios from "axios";
import { BACKEND_URL } from "../utility/Constants";

class OrderDataService {
    postOrder(details, address = "0", token) {
        const date = new Date();
        return axios.post(
            `${BACKEND_URL}/orders`,
            {
                details,
                address,
                date,
            },
            {
                headers: {
                    Authorization: "Bearer " + token, //the token is a variable which holds the token
                },
            }
        );
    }
}

export default new OrderDataService();
