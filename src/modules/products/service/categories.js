import api from "../../../services/api";


export async function listCategories() {
    try {
        const response = await api.get('/category/');
        return response.data;
    } catch (error) {

        throw {
            errors:
                error.response?.data?.errors ||
                [{ message: error.response?.data?.message || 'Error inesperado' }],
        };
    }


}

export async function createCateories(data) {
    try {
        const response = await api.post('/category/', data);
        return response.data;
    } catch (error) {

        throw {
            errors:
                error.response?.data?.errors ||
                [{ message: error.response?.data?.message || 'Error inesperado' }],
        };
    }

}
export async function updateCategories(id, data) {
    try {
        const response = await api.patch(`/category/${id}`, data);
        return response.data;
    } catch (error) {

        throw {
            errors:
                error.response?.data?.errors ||
                [{ message: error.response?.data?.message || 'Error inesperado' }],
        };
    }

}
export async function updateStatusCategories(id, action) {
    try {
        const response = await api.patch(`/category/${id}/${action}`);
        return response.data;
    } catch (error) {
        throw {
            errors:
                error.response?.data?.errors ||
                [{ message: error.response?.data?.message || 'Error inesperado' }],
        };
    }
};

export async function deleteCategories(id) {
    try {
        const response = await api.delete(`/category/${id}/delete`);
        return response.data;
    } catch (error) {
        throw {
            errors:
                error.response?.data?.errors ||
                [{ message: error.response?.data?.message || 'Error inesperado' }],
        };
    }
};