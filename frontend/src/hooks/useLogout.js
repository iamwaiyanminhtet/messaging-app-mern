import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const useLogout = () => {
	const [loading, setLoading] = useState(false);
	const { setAuthUser } = useAuthContext();
	const navigate = useNavigate();

	const logout = async () => {
		setLoading(true);
		try {
			const res = await fetch("/api/auth/signout", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
			});
			const data = await res.json();
			if (data.success === false) {
				throw new Error(data.message);
			}

			localStorage.removeItem("chat-user");
			setAuthUser(null);
			navigate('/signin')
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

	return { loading, logout };
};
export default useLogout;