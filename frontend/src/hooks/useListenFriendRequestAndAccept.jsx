import { useEffect, useState } from "react";
import { useSocketContext } from "../context/SocketContext"
import { useAuthContext } from "../context/AuthContext";

const useListenFriendRequest = () => {
  const { socket } = useSocketContext();
  const [response, setResponse] = useState('');
  const { setAuthUser } = useAuthContext();

  useEffect(() => {
    socket?.on('friend-request', (response) => {
      setResponse(response)
      setAuthUser(response.user)
      localStorage.setItem("chat-user", JSON.stringify(response.user));
    })

    return () => {
      socket?.off('friend-request');
    };
  }, [socket, setAuthUser]);

  return response;
}

const useListenFriendAccept = () => {
  const { socket } = useSocketContext();
  const [response, setResponse] = useState('');
  const { setAuthUser } = useAuthContext();

  useEffect(() => {
    socket?.on('accept-friend', (response) => {
      console.log(response)
      setResponse(response)
      setAuthUser(response.user)
      localStorage.setItem("chat-user", JSON.stringify(response.user));
    })

    return () => {
      socket?.off('accept-friend');
    };
  }, [socket, setAuthUser]);

  return { acceptResponse : response };
}
export { useListenFriendAccept };
export default useListenFriendRequest;