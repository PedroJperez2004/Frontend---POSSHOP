import { useState, useEffect } from 'react';
import { listSales } from '../service/sales';



export const useListSales = () => {
    const [sales, setSales] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const list = async () => {
        setLoading(true);
        try {
            const result = await listSales();
            setSales(result || []);
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

    return { sales, loading, error, list, setError };
};