import { useState } from "react";
import { deleteTaxes } from '../service/taxes'

export default function useDeleteTaxes() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    const deleteTax = async (id) => {
        try {
            setLoading(true)
            setError(null)
            const result = await deleteTaxes(id)
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



    return { deleteTax, loading, error, setError };

}