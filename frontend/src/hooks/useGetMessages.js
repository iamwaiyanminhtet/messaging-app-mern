import { useState } from "react";
import { toast } from "react-toastify";
import useUsers from "../zustand/useUsers";

const useGetMessages = () => {
    const [loading, setLoading] = useState(false);
    const { messages, setMessages } = useUsers();
    const [conversationId, setConversationId] = useState(null);

    const getMessages = async (receiverId) => {
        setLoading(true);
        try {
            const res = await fetch(`/api/message/${receiverId}`);
            const data = await res.json();
            if (data.success === false) throw new Error(data.message);
            setMessages(data.messages);
            setConversationId(data._id)
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

    return { loading, messages, getMessages, conversationId };
};
export default useGetMessages;