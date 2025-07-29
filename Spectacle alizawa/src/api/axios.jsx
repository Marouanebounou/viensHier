import axios from "axios";

const api = axios.create({
    baseURL: 'https://viens-hier-api.onrender.com',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
});

export default api; 