import { useState } from "react";
import { login } from "../service/login.js";
import { useNavigate } from "react-router-dom";

// useLogin.js
export function useLogin() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const signIn = async (credential) => {
        try {
            setLoading(true);
            setError(null);

            const data = await login(credential);
            const user = data.user;

            // Solo los roles que realmente usas
            const routesByRole = {
                admin: '/usuarios',
                employee: '/ventas'
            };

            if (routesByRole[user.role]) {
                navigate(routesByRole[user.role]);
            } else {
             
                console.warn("Rol no reconocido:", user.role);
                navigate('/login');
            }

            return user;
        } catch (err) {
            setError(err.errors ? err.errors.map(e => e.message).join(", ") : err.message);
            return null;
        } finally {
            setLoading(false);
        }
    };
    return { signIn, loading, error, };
}