import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true, // VITAL para que las cookies viajen
});

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // 1. Si es login o ya intentamos refrescar y falló, directo al rechazo
        if (
            originalRequest?.url?.includes('/users/login') ||
            originalRequest?.url?.includes('/auth/refresh-token') ||
            originalRequest._retry //  Evita bucles infinitos si el refresh también da 401
        ) {
            return Promise.reject(error);
        }

        // 2. Si el error es 401 (Unauthorized), intentamos el refresh
        if (error.response?.status === 401) {
            originalRequest._retry = true;

            try {
                // El backend recibirá la cookie refresh_token y responderá con una nueva access_token
                await api.post('/auth/refresh-token');

                // Re-intentamos la petición original que falló
                return api(originalRequest);
            } catch (refreshError) {
                // Si el refresh falla, es que la sesión murió de verdad
                console.error("Sesión expirada, redirigiendo...");
                // Aquí podrías limpiar algún estado de Redux/Zustand antes de irte
                window.location.href = '/login';
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default api;