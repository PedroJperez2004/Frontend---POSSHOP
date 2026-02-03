import { useState } from "react";
import { createMovement } from "../service/inventory";


export default function useCreateMovement() {


    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(null);


    const create = async (data) => {
        try {
            setLoading(true)
            setErrors(null)
            const result = await createMovement(data)
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

    return { create, loading, errors, setErrors }


} 
