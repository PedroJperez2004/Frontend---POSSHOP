import api from "../../../services/api";

export async function listUsers() {
    try {
        const response = await api.get('/users/list-users');
        return response.data;
    } catch (error) {

        throw {
            errors:
                error.response?.data?.errors ||
                [{ message: error.response?.data?.message || 'Error inesperado' }]
        };
    }
}


export async function registerUsers(data) {
    try {
        const response = await api.post('/users/register', data);
        return response.data;
    } catch (error) {

        throw {
            errors:
                error.response?.data?.errors ||
                [{ message: error.response?.data?.message || 'Error inesperado' }],
        };
    }

}

export async function updateStatusUser(id, action) {
    try {
        const response = await api.patch(`/users/${id}/${action}`);
        return response.data;
    } catch (error) {
        throw {
            errors:
                error.response?.data?.errors ||
                [{ message: error.response?.data?.message || 'Error inesperado' }],
        };
    }
};

export async function updateUser(id, data) {
    try {
        const response = await api.patch(`users/${id}/update`, data);
        return response.data;
    } catch (error) {
        throw {
            errors:
                error.response?.data?.errors ||
                [{ message: error.response?.data?.message || 'Error inesperado' }],
        };
    }
}
