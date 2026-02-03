import { useState } from "react";
import { deleteCategories } from '../service/categories'

export default function useDeleteCategories() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    const deleteCategory = async (id) => {
        try {
            setLoading(true)
            setError(null)
            const result = await deleteCategories(id)
            return result.message;

        } catch (err) {
            if (err.errors) {
                setError(err.errors.map(e => e.message).join(", "));
            } else {
                setError(err.message);
            }
            return false;

        } finally {
            setLoading(false)
        }

    }



    return { deleteCategory, loading, error, setError };

}