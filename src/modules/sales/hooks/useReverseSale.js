import { useState } from 'react';
import { reverseSale } from '../service/sales';



export const useReverseSale = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const reverse = async (id) => {
        setLoading(true);
        try {
            const result = await reverseSale(id);
            setError(null);
            return result
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


    return { loading, error, reverse, setError };
};