import { useState } from "react";
import { toast } from "react-toastify";
import { useAuthContext } from "../context/AuthContext";

const useFriendAccept = () => {
    const [loading, setLoading] = useState(false);
    const {setAuthUser} = useAuthContext();

    const acceptFriendRequest = async (fromUserId) => {
        setLoading(true);
        try {
            const res = await fetch(`/api/user/accept-friend/${fromUserId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await res.json();
            if (data.success === false) {
                throw new Error(data.message);
            } else {
                toast.info(data.message, {
                    position: "top-center",
                    autoClose: 3000,
                    theme: "dark",
                    draggable: true
                });
            }
            setAuthUser(data.user)
            return true;
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

    return { loading, acceptFriendRequest };
};
export default useFriendAccept;