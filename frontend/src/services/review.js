import axios from "axios";
import { BACKEND_URL } from "../utility/Constants";

class ReviewDataService {
    postReview(product_id, title, content, stars, token) {
        const date = new Date();
        return axios.post(
            `${BACKEND_URL}/reviews`,
            {
                product_id,
                title,
                content,
                stars,
                date,
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
    getReviewsByProduct(productId, limit = 20, skip = 0) {
        return axios.get(`${BACKEND_URL}/reviews?product=${productId}&limit=${limit}&skip=${skip}&sortBy=date:desc`);
    }

    getAllReviewsByProduct(productId) {
        return axios.get(`${BACKEND_URL}/reviews?product=${productId}`);
    }
}

export default new ReviewDataService();
