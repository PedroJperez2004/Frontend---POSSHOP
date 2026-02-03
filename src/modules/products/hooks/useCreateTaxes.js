import { useState } from "react";
import { createTaxes } from '../service/taxes'

export default function useCreateTaxes() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    const create = async (data) => {
        try {
            setLoading(true)
            setError(null)
            const result = await createTaxes(data)
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



    return { create, loading, error, setError };

}