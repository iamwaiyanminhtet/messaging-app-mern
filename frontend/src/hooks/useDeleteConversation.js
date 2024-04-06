import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const useDeleteConversation = () => {
	const navigate = useNavigate();

	const deleteConversation = async (convoId) => {
		try {
			const res = await fetch(`/api/message/convo/${convoId}`, {
				method: "DELETE",
				headers: { "Content-Type": "application/json" },
			});
			const data = await res.json();
			if (data.success === false) {
				throw new Error(data.message);
			}
			navigate('/');
		} catch (error) {
			toast.error(error.message, {
                position: "top-center",
                autoClose: 3000,
                theme: "dark",
                draggable: true
            });
		}
	};

	return {deleteConversation};
};
export default useDeleteConversation;