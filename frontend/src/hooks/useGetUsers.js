import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const useGetUsers = () => {

    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        setLoading(true)
        const getUsers = async () => {
            try {
                const res = await fetch('/api/user/users');
                const data = await res.json();

                if (data.success === false) {
                    throw new Error(data.message);
                }
                setUsers(data);
            } catch (error) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        }
        getUsers()
    }, [])

    return { loading, users };
}

export default useGetUsers;