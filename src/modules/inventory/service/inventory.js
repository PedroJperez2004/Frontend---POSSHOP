import api from "../../../services/api";

export async function listInventory() {
    try {
        const response = await api.get('/inventory/movements');
        return response.data;
    } catch (error) {

        throw {
            errors:
                error.response?.data?.errors ||
                [{ message: error.response?.data?.message || 'Error inesperado' }],
        };
    }

}

export async function createMovement(data) {
    try {
        const response = await api.post(`/inventory/`, data);
        return response.data;
    } catch (error) {

        throw {
            errors:
                error.response?.data?.errors ||
                [{ message: error.response?.data?.message || 'Error inesperado' }],
        };
    }


}