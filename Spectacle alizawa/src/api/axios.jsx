import axios from "axios";

const api = axios.create({
    baseURL: 'https://srv931649.hstgr.cloud',
    headers: {
        'Content-Type': 'application/json'
    }
});

export default api; 