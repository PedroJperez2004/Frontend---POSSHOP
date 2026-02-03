import { useState } from "react";
import { createSales } from "../service/sales";


export default function useCreateSales() {


    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(null);


    const createSale = async (data) => {
        try {
            setLoading(true)
            setErrors(null)
            const result = await createSales(data)
            return result
        } catch (err) {
            if (err.errors) {
                setErrors(err.errors.map(e => e.message).join(", "))
            } else {
                setErrors(err.message)

            }
            return false
        } finally {
            setLoading(false)

        }


    }

    return { createSale, loading, errors, setErrors }


} 
