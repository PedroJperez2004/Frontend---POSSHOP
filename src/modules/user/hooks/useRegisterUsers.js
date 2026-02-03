import { useState } from "react";
import { registerUsers } from '../service/users.js'

export default function useRegisterUsers() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    const registerUser = async (data) => {
        try {
            setLoading(true)
            setError(null)
            const result = await registerUsers(data)
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
    return { registerUser, loading, error, setError };

}