import { useEffect, useState } from "react";
import { listTaxes } from "../service/taxes";

export function useListTaxes() {

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [taxes, setTaxes] = useState([])

    const list = async () => {
        try {
            setLoading(true)
            setError(null)

            const result = await listTaxes()
            setTaxes(result || [])
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


    return { list, loading, error, taxes, setError };

}

