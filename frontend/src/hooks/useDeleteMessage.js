import { useState } from "react";
import { toast } from "react-toastify";
import useUsers from "../zustand/useUsers";

const useDeleteMessage = () => {
	const [loading, setLoading] = useState(false);
    const {messages, setMessages} = useUsers();

	const deleteMessage = async (messageId) => {
		setLoading(true);
		try {
			const res = await fetch(`/api/message/${messageId}`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
			});
			const data = await res.json();
			if (data.success === false) {
                throw new Error(data.message);
            }
			setMessages(messages.filter(msg => msg._id !== data._id))
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

	return { deleteMessage };
};
export default useDeleteMessage;