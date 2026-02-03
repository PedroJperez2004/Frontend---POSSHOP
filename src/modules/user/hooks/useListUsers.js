import { useEffect, useState } from "react";
import { listUsers } from "../service/users.js";


export function useListUsers() {

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [users, setUsers] = useState([])

    const list = async () => {
        try {
            setLoading(true)
            setError(null)

            const result = await listUsers()
            setUsers(result.Users)
            return result.Users
        } catch (err) {
            if (err.errors) {
                setError(err.errors.map(e => e.message).join(", "));
            } else {
                setError(err.message);
            }
        } finally {
            setLoading(false)
        }


    }
    useEffect(() => {
        list()
    }, [])


    return { list, loading, error, users };

}