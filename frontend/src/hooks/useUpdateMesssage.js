import { useState } from "react";
import { toast } from "react-toastify";
import useUsers from "../zustand/useUsers";

const useUpdateMessage = () => {
	const [loading, setLoading] = useState(false);
    const {messages, setMessages} = useUsers();

	const updateMessage = async (message, messageId) => {
		setLoading(true);
		try {
			const res = await fetch(`/api/message/${messageId}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ message }),
			});
			const data = await res.json();
			if (data.success === false) {
                throw new Error(data.message);
            }
			setMessages(messages.map(msg => msg._id === data._id ? data : msg))
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

	return { loading, updateMessage };
};
export default useUpdateMessage;