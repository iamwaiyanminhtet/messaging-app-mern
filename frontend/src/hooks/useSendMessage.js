import { useState } from "react";
import { toast } from "react-toastify";
import useUsers from "../zustand/useUsers";

const useSendMessage = () => {
	const [loading, setLoading] = useState(false);
    const {messages, setMessages} = useUsers();

	const sendMessage = async (message, receiverId) => {
		setLoading(true);
		try {
			const res = await fetch(`/api/message/send/${receiverId}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ message }),
			});
			const data = await res.json();
			if (data.success === false) {
                throw new Error(data.message);
            }
			if(messages?.length > 0) {
				setMessages([...messages, data])
			} else {
				setMessages([data])
			}
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

	return { loading, sendMessage };
};
export default useSendMessage;