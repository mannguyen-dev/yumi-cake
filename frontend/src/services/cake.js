import axios from "axios";
import { BACKEND_URL } from "../utility/Constants";

class CakeDataService {
    getPopular(limit = 20, skip = 0) {
        return axios.get(`${BACKEND_URL}/products/popular?limit=${limit}&skip=${skip}`);
    }

    getAll(limit = 20, skip = 0) {
        return axios.get(`${BACKEND_URL}/products?limit=${limit}&skip=${skip}`);
    }

    getByCategory(category, limit = 20, skip = 0) {
        return axios.get(`${BACKEND_URL}/products?category=${category}&limit=${limit}&skip=${skip}`);
    }

    getNew(limit = 20, skip = 0) {
        return axios.get(`${BACKEND_URL}/products/trending?limit=${limit}&skip=${skip}`);
    }

    get(id) {
        return axios.get(`${BACKEND_URL}/products/id/${id}`);
    }

    getByName(name = "", limit = 20, skip = 0) {
        return axios.get(`${BACKEND_URL}/products?name=${name}&limit=${limit}&skip=${skip}`);
    }

    find(query, by = "name", limit = 20, skip = 0) {
        return axios.get(`${BACKEND_URL}/products?${by}=${query}&limit=${limit}&skip=${skip}`);
    }
}

export default new CakeDataService();
