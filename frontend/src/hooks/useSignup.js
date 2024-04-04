import { useState } from "react"
import { useAuthContext } from "../context/AuthContext"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"


const useSignup = () => {
    const [loading, setLoading] = useState(false)
    const { setAuthUser } = useAuthContext();
    const navigate = useNavigate();

    const signup = async ({ fullname, username, password, confirmPassword, gender }) => {
        const result = validationCheck({ fullname, username, password, confirmPassword, gender });
        if(!result) return;
        setLoading(true);
        try {
            const res = await fetch("/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ fullname, username, password, confirmPassword, gender }),
            });

            const data = await res.json();
            if (data.success === false) {
                throw new Error(data.message);
            }
            localStorage.setItem('chat-user', JSON.stringify(data))
            setAuthUser(data);
            navigate('/');

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

    return { loading, signup }
}

export default useSignup

function validationCheck({ fullname, username, password, confirmPassword, gender }) {
    if (!fullname || !username || !password || !confirmPassword || !gender) {
        toast.error("Please fill in all fields", {
            position: "top-center",
            autoClose: 3000,
            theme: "dark",
            draggable: true
        });
        return false;
    }

    if(password !== confirmPassword) {
        toast.error("Password do not match", {
            position: "top-center",
            autoClose: 3000,
            theme: "dark",
            draggable: true
        });
        return false;
    }
}