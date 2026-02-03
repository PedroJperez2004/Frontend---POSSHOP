import { useState, useEffect } from 'react';
import { listCategories } from '../service/categories';



export const useListCategories = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const list = async () => {
        setLoading(true);
        try {
            const result = await listCategories();
            setCategories(result.Category || []);
            setError(null);
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
    useEffect(() => {
        list();
    }, []);

    return { categories, loading, error, list, setError };
};