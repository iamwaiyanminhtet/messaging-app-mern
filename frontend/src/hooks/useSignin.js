import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const useSignin = () => {
	const [loading, setLoading] = useState(false);
	const { setAuthUser } = useAuthContext();
    const navigate = useNavigate();

	const signin = async ({username, password}) => {
		if (!username || !password) {
            toast.error("Please fill in all fields", {
                position: "top-center",
                autoClose: 3000,
                theme: "dark",
                draggable: true
            });
            return false;
        }

		setLoading(true);
		try {
			const res = await fetch("/api/auth/signin", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ username, password }),
			});

			const data = await res.json();
			if (data.success === false) {
                throw new Error(data.message);
            }
			localStorage.setItem("chat-user", JSON.stringify(data));
			setAuthUser(data);
            navigate('/')
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
	};

	return { loading, signin };
};
export default useSignin;