import axios from "axios";

const api = axios.create({
    baseURL: 'srv931649.hstgr.cloud',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
});

export default api; 