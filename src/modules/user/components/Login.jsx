/**
 * Este es el “pegamento”.
 * No decide nada, solo conecta UI con el hook.
 */

import LoginForm from "./LoginForm";
import { useLogin } from "../hooks/useLogin";

export default function Login() {

    const { signIn, loading, error } = useLogin();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = new FormData(e.target)

        await signIn({
            email: form.get('email'),
            password: form.get('password')
        })
    }

    return <LoginForm onSubmit={handleSubmit} loading={loading} error={error} />
}