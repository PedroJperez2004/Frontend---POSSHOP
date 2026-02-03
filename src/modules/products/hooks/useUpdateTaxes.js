import { useState } from "react";
import { updateTaxes } from '../service/taxes'

export default function useUpdateTaxes() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const update = async (id, data) => {
        setLoading(true);
        setError(null);
        try {
            const res = await updateTaxes(id, data);
            return res.message;
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
    return { update, loading, error, setError };
}