import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
import useUsers from "../zustand/useUsers"
import incomingMessage from "../assets/iphone_ding.mp3";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const useListenMessages = () => {
  const { socket } = useSocketContext();
  const { messages, setMessages } = useUsers();

  useEffect(() => {
    socket?.on('newMessage', (newMessage) => {
      newMessage.shouldShake = true;
      const notification = new Audio(incomingMessage);
      notification.play();
      if (messages?.length > 0) {
        setMessages([...messages, newMessage])
      } else {
        setMessages([newMessage])
      }
    })

    return () => socket?.off('newMessage')
  }, [socket, messages, setMessages])
}

const useListenUpdateMessage = () => {
  const { socket } = useSocketContext();
  const { messages, setMessages } = useUsers();

  useEffect(() => {
    socket?.on('update-message', (messageToUpdate) => {
      setMessages(messages.map(msg => msg._id === messageToUpdate._id ? messageToUpdate : msg));
    })

    return () => socket?.off('update-message')
  }, [socket, messages, setMessages])
}

const useListenDeleteMessage = () => {
  const { socket } = useSocketContext();
  const { messages, setMessages } = useUsers();

  useEffect(() => {
    socket?.on('delete-message', (messageToDelete) => {
      setMessages(messages.filter(msg => msg._id !== messageToDelete._id));
    })

    return () => socket?.off('delete-message')
  }, [socket, messages, setMessages])
}

const useListenDeleteConvo = () => {
  const { socket } = useSocketContext();
  const navigate = useNavigate();

  useEffect(() => {
    socket?.on('delete-convo', () => {
      navigate('/')
      toast.info('Conversation has been deleted by other user.', {
        position: "top-center",
        autoClose: 3000,
        theme: "dark",
        draggable: true
    });
    })
    return () => socket?.off('delete-convo')
  }, [socket, navigate])
}

export { useListenUpdateMessage, useListenDeleteMessage, useListenDeleteConvo }
export default useListenMessages