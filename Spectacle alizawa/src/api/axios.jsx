import axios from "axios";

const api = axios.create({
    baseURL: 'https://vienshier-api.onrender.com/',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
});

export default api; 