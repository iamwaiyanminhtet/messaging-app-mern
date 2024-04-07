
import { useState } from "react"
import { useAuthContext } from "../context/AuthContext"
import { toast } from "react-toastify"


const useUpdateUserInfo = () => {
    const [loading, setLoading] = useState(false)
    const { setAuthUser } = useAuthContext();

    const updateUserInfo = async ({ fullname, username, password }) => {
        const result = validationCheck({ fullname, username, password });
        if(!result) return;
        setLoading(true);
        try {
            const res = await fetch("/api/user", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ fullname, username, password }),
            });

            const data = await res.json();
            if (data.success === false) {
                throw new Error(data.message);
            }
            localStorage.setItem('chat-user', JSON.stringify(data))
            setAuthUser(data);
        } catch (error) {
            toast.error(error.message, {
                position: "top-center",
                autoClose: 3000,
                theme: "dark",
                draggable: true
            });
        } finally {
            setLoading(false);
        }
    }

    return { loading, updateUserInfo }
}

export default useUpdateUserInfo

function validationCheck({ fullname, username, password }) {

    if( !fullname &&  !username && !password ) {
        toast.error("No change has made", {
            position: "top-center",
            autoClose: 3000,
            theme: "dark",
            draggable: true
        });
        return false;
    }

    return true;
}