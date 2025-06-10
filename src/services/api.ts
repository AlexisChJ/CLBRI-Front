import axios from 'axios';
import Config from '../config';

// Create an Axios instance
const api = axios.create({
    baseURL: Config.BASE_URL,
    timeout: 5000 // 5s
});

// Request Interceptor
api.interceptors.request.use(
    (config) => {
        const newConfig = { ...config };
                
        newConfig.headers.Accept = "application/json";
        return newConfig;
    },
    (error) => {
        console.error(error);
        return Promise.reject(error)
    }
)

// Response Interceptor
api.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error("Response error: ", error);
        return Promise.reject(error);
    }
)

export default api;
