import api from "../../../services/api";

export async function listProducts() {
    try {
        const response = await api.get('/products/list-products');
        return response.data;
    } catch (error) {
        throw {
            errors:
                error.response?.data?.errors ||
                [{ message: error.response?.data?.message || 'Error inesperado' }],
        };
    }
}
export async function createProducts(data) {
    try {

        const response = await api.post('/products/create', data);
        return response.data;
    } catch (error) {

        throw {
            errors:
                error.response?.data?.errors ||
                [{ message: error.response?.data?.message || 'Error inesperado' }],
        };
    }

}
export async function updateProducts(id, data) {
    try {
        const response = await api.patch(`/products/${id}/update`, data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {

        throw {
            errors:
                error.response?.data?.errors ||
                [{ message: error.response?.data?.message || 'Error inesperado' }],
        };
    }

}


export async function updateStatusProducts(id, action) {
    try {
        const response = await api.patch(`/products/${id}/${action}`);
        return response.data;
    } catch (error) {
        throw {
            errors:
                error.response?.data?.errors ||
                [{ message: error.response?.data?.message || 'Error inesperado' }],
        };
    }
};

export async function deleteProducts(id) {
    try {
        const response = await api.delete(`/products/${id}/delete`);
        return response.data;
    } catch (error) {
        throw {
            errors:
                error.response?.data?.errors ||
                [{ message: error.response?.data?.message || 'Error inesperado' }],
        };
    }
};



