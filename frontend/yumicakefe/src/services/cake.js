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

    getByCategory(category, limit = 20, skip = 0) {
        return axios.get(`${URL}/products?category=${category}&limit=${limit}&skip=${skip}`);
    }

    getNew(limit = 20, skip = 0) {
        return axios.get(`${URL}/products/trending?limit=${limit}&skip=${skip}`);
    }

    get(id) {
        return axios.get(`${URL}/products/id/${id}`);
    }

    getByName(name = "", limit = 20, skip = 0) {
        return axios.get(`${URL}/products?name=${name}&limit=${limit}&skip=${skip}`);
    }

    find(query, by = "name", limit = 20, skip = 0) {
        return axios.get(`${URL}/products?${by}=${query}&limit=${limit}&skip=${skip}`);
    }
}

export default new CakeDataService();
