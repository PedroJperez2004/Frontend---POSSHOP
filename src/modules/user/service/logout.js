import api from "../../../services/api.js";


export async function logout() {
    try {
        const response = await api.post('/users/logout');
        return response.data;
    } catch (error) {
        throw {
            errors:
                error.response?.data?.errors ||
                [{ message: error.response?.data?.message || 'Error inesperado' }],
        };
    }


}