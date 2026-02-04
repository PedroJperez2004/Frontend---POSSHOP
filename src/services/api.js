import axios from "axios";

const api = axios.create({
    // baseURL: "http://localhost:3000/",
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/",
    withCredentials: true,
    // headers: {
    //     'Content-Type': 'application/json'
    // }
});

api.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;
        if (originalRequest?.url?.includes('/users/login')) {
            return Promise.reject(error);
        }
        // 🔴 NO tocar el refresh
        if (originalRequest?.url?.includes('/auth/refresh-token')) {
            return Promise.reject(error);
        }

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                await api.post('/auth/refresh-token');
                return api(originalRequest);
            } catch {
                window.location.href = '/login';
                return Promise.reject(error);
            }
        }

        return Promise.reject(error);
    }
);



export default api;
