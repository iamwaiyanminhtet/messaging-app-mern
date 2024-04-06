import ChatUser from "./ChatUser";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import Messages from "./Messages";
import MessageInput from "./MessageInput";
import useGetMessages from "../../hooks/useGetMessages";

const Chat = () => {

  const { username } = useParams()
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState([]);

  useEffect(() => {
    setLoading(true)
    const getUser = async () => {
      try {
        const res = await fetch(`/api/user/${username}`);
        const data = await res.json();

        if (data.success === false) {
          throw new Error(data.message);
        }
        setUser(data[0]);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    }
    if (username) getUser();
  }, [username]);

  const { loading: messageLoading, messages, getMessages, conversationId } = useGetMessages();
  
  useEffect(() => {
    if (user._id) getMessages(user._id)
  }, [user]);


  return (
    <div className="min-h-screen flex justify-center items-center text-slate-100 p-5 sm:p-0 sm:py-5">
      <div className=" w-full sm:w-1/2 sm:max-w-3xl bg-gray-800 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-40 border border-gray-700 px-5 py-3 flex flex-col gap-5">
        {
          loading &&
          <div className="flex justify-center m-5">
            <span className="loading loading-spinner text-info loading-lg"></span>
          </div>
        }
        {
          !loading && user &&
          <>
            <ChatUser user={user} convoId={conversationId} />
            <Messages user={user} loading={messageLoading} messages={messages} />
            <MessageInput user={user}  />
          </>
        }
      </div>
    </div>
  )
}

export default Chat