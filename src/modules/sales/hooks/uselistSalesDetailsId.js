import { useState } from 'react';
import { listSalesItemsId } from '../service/sales';



export const useListSalesItemsId = () => {
    const [salesItems, setSaleItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const list = async (id) => {
        setLoading(true);
        try {
            const result = await listSalesItemsId(id);
            setSaleItems(result || []);
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


    return { salesItems, loading, error, list, setError };
};