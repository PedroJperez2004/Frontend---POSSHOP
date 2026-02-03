import { useState, useEffect } from 'react';
import { listInventory } from '../service/inventory';



export const useListInventory = () => {
    const [inventory, setInventory] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const list = async () => {
        setLoading(true);
        try {
            const result = await listInventory();
            setInventory(result.result.Movements || []);
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

    return { inventory, loading, error, list, setError };
};