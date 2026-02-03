import { updateStatusCategories } from "../service/categories";
import { useState } from "react";


export default function useUpdateStatusCategories() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const updateStatus = async (id, isActive) => {
        try {
            // Si isActive es true, la acción es desactivate.
            const actionCategory = isActive ? 'desactivate' : 'activate';

            setLoading(true);
            setError(null);

            const responseData = await updateStatusCategories(id, actionCategory);

            // Retornamos la data que contiene el .message del backend
            return responseData;
        } catch (err) {
            if (err.errors) {
                setError(err.errors.map(e => e.message).join(", "));
            } else {
                setError(err.message);
            }
            return false;

        } finally {
            setLoading(false);
        }
    };
    return { updateStatus, loading, error, setError };
}
