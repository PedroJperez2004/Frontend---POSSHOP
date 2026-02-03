import api from "../../../services/api";

export async function listTaxes() {
    try {
        const response = await api.get('/taxes/');
        return response.data;
    } catch (error) {

        throw {
            errors:
                error.response?.data?.errors ||
                [{ message: error.response?.data?.message || 'Error inesperado' }],
        };
    }


}

export async function updateStatusTaxes(id, action) {
    try {
        const response = await api.patch(`/taxes/${id}/${action}`);
        return response.data;
    } catch (error) {
        throw {
            errors:
                error.response?.data?.errors ||
                [{ message: error.response?.data?.message || 'Error inesperado' }],
        };
    }
};

export async function createTaxes(data) {
    try {
        const response = await api.post('/taxes/', data);
        return response.data;
    } catch (error) {

        throw {
            errors:
                error.response?.data?.errors ||
                [{ message: error.response?.data?.message || 'Error inesperado' }],
        };
    }

}
export async function updateTaxes(id, data) {
    try {
        const response = await api.patch(`/taxes/${id}/update`, data);
        return response.data;
    } catch (error) {

        throw {
            errors:
                error.response?.data?.errors ||
                [{ message: error.response?.data?.message || 'Error inesperado' }],
        };
    }

}

export async function deleteTaxes(id) {
    try {
        const response = await api.delete(`/taxes/${id}/delete`);
        return response.data;
    } catch (error) {
        throw {
            errors:
                error.response?.data?.errors ||
                [{ message: error.response?.data?.message || 'Error inesperado' }],
        };
    }
};
