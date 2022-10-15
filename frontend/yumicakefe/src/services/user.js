import axios from "axios";

export const URL = "https://yumicake-backend.herokuapp.com";
// export const url = "http://localhost:3001";

class UserDataService {
    login(email, password) {
        return axios.post(`${URL}/users/login`, {
            email,
            password,
        });
    }

    signup(email, password, name = "", phone = "0") {
        return axios.post(`${URL}/users`, {
            name,
            email,
            password,
            phone,
        });
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

export default new UserDataService();
