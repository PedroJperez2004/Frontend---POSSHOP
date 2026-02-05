import { useEffect, useState } from "react";
import { listProducts } from "../service/products";

export function useListProducts() {

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [products, setProducts] = useState([])

    const list = async () => {
        try {
            setLoading(true)
            setError(null)

            const result = await listProducts()
            setProducts(result.Products || [])
            setError(null);

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
    useEffect(() => {
        list()
    }, [])


    return { list, loading, error, products, setError };

}

