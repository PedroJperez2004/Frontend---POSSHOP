import api from "../../../services/api.js";

export async function login(data) {
    try {

        const response = await api.post('/users/login', data);
        return response.data;
    } catch (error) {
        throw {
            errors:
                error.response?.data?.errors ||
                [{ message: error.response?.data?.message || 'Error inesperado' }],
        };
    }
}