import { useState } from "react";
import { createProducts } from '../service/products'

export default function useCreateProducts() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    const create = async (data) => {
        try {
            setLoading(true)
            setError(null)
            const result = await createProducts(data)
            
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