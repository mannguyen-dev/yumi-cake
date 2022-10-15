import axios from "axios";

export const URL = "https://yumicake-backend.herokuapp.com";
// export const url = "http://localhost:3001";

class CakeDataService {
    getPopular(limit = 20, skip = 0) {
        return axios.get(`${URL}/products/popular?limit=${limit}&skip=${skip}`);
    }

    getAll(limit = 20, skip = 0) {
        return axios.get(`${URL}/products?limit=${limit}&skip=${skip}`);
    }

    getNew(limit = 20, skip = 0) {
        return axios.get(`${URL}/products/trending?limit=${limit}&skip=${skip}`);
    }

    get(id) {
        return axios.get(`${URL}/products/id/${id}`);
    }

    find(query, by = "name", limit = 20, skip = 0) {
        return axios.get(`${URL}/products?${by}=${query}&limit=${limit}&skip=${skip}`);
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

export default new CakeDataService();
