import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useUsers from "../zustand/useUsers";

const useGetUsers = () => {

    const [loading, setLoading] = useState(false);
    const { setSidebarUsers} = useUsers();

    useEffect(() => {
        setLoading(true)
        const getUsers = async () => {
            try {
                const res = await fetch('/api/user/users');
                const data = await res.json();

                if (data.success === false) {
                    throw new Error(data.message);
                }
                setSidebarUsers(data);
            } catch (error) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        }
        getUsers()
    }, [])

    return { loading };
}

export default useGetUsers;