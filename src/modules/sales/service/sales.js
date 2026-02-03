import api from "../../../services/api";


export async function createSales(data) {
    try {
        const response = await api.post('sales/', data);
        return response.data;
    } catch (error) {

        throw {
            errors:
                error.response?.data?.errors ||
                [{ message: error.response?.data?.message || 'Error inesperado' }],
        };
    }

}

export async function listSales() {
    try {
        const response = await api.get('sales/list');
        return response.data;
    } catch (error) {

        throw {
            errors:
                error.response?.data?.errors ||
                [{ message: error.response?.data?.message || 'Error inesperado' }],
        };
    }

}

export async function listSalesItemsId(id) {
    try {
        const response = await api.get(`sale-items/${id}/items`);
        return response.data;
    } catch (error) {

        throw {
            errors:
                error.response?.data?.errors ||
                [{ message: error.response?.data?.message || 'Error inesperado' }],
        };
    }

}

export async function reverseSale(id) {
    try {
        const response = await api.post(`sales/${id}/reverse`);
        return response.data;
    } catch (error) {

        throw {
            errors:
                error.response?.data?.errors ||
                [{ message: error.response?.data?.message || 'Error inesperado' }],
        };
    }

}

