import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext"; 
import useUsers from "../zustand/useUsers"
import incomingMessage from "../assets/iphone_ding.mp3"

const useListenMessages = () => {
  const { socket } = useSocketContext();
  const { messages, setMessages } = useUsers();

  useEffect(() => {
    socket?.on('newMessage', (newMessage) => {
        newMessage.shouldShake = true;
        const notification = new Audio(incomingMessage);
        notification.play();
        if(messages?.length > 0) {
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

export { useListenUpdateMessage }
export default useListenMessages