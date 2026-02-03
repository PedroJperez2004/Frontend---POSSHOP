// En hooks/useUpdateUser.js (o añadir a useRegisterUsers)


import { useState } from "react";
import { updateUser } from "../service/users";

export function useUpdateUser() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const update = async (id, data) => {
        setLoading(true);
        setError(null);
        try {
            const res = await updateUser(id, data);
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