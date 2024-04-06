import { useState } from "react";
import { toast } from "react-toastify";

const useFriendRequest = () => {
    const [loading, setLoading] = useState(false);

    const sendFriendRequest = async (toUserId) => {
        setLoading(true);
        try {
            const res = await fetch(`/api/user/add-friend/${toUserId}`, {
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

    return { loading, sendFriendRequest };
};
export default useFriendRequest;