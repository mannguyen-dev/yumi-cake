import axios from "axios";
import { BACKEND_URL } from "../utility/Constants";

class OrderDataService {
    postOrder(details, address = "0", token) {
        console.log({ details, address });
        return axios.post(
            `${BACKEND_URL}/orders`,
            {
                details,
                address,
            },
            {
                headers: {
                    Authorization: "Bearer " + token, //the token is a variable which holds the token
                },
            }
        );
    }
    // createReview(data) {
    //     return axios.post(`${url}/api/v1/movies/review`, data);
    // }
    // updateReview(data) {
    //     return axios.put(`${url}/api/v1/movies/review`, data);
    // }
    // deleteReview(id, userId) {
    //     return axios.delete(`${url}/api/v1/movies/review`, {
    //         data: { review_id: id, user_id: userId },
    //     });
    // }
    // getRatings() {
    //     return axios.get(`${url}/api/v1/movies/ratings`);
    // }
}

export default new OrderDataService();
