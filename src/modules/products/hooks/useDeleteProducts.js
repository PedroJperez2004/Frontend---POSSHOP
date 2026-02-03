import { useState } from "react";
import { deleteProducts } from '../service/products'

export default function useDeleteProducts() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    const deleteProduct = async (id) => {
        try {
            setLoading(true)
            setError(null)
            const result = await deleteProducts(id)
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



    return { deleteProduct, loading, error, setError };

}