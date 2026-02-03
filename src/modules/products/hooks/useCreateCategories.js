import { useState } from "react";
import { createCateories } from '../service/categories'

export default function useCreateCategory() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    const createCategory = async (data) => {
        try {
            setLoading(true)
            setError(null)
            const result = await createCateories(data)
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



    return { createCategory, loading, error, setError };

}