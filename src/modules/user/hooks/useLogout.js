import { useState } from "react";
import { logout } from "../service/logout.js";

import { useNavigate } from "react-router-dom";

export function useLogout() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const logOut = async () => {
        try {
            setLoading(true)
            setError(null)
            const response = await logout()
            navigate('/login');
            return response.message;

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
    return { logOut, loading, error };

}