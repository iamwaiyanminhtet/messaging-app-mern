/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react";
import Message from "./Message"
import useListenMessages from "../../hooks/useListenMessage";

const Messages = ({ loading, user, messages }) => {

  useListenMessages();
  const lastMessageRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages]);

  return (
    <div className="max-h-[calc(85vh-120px)] overflow-auto p-3" >
      {
        loading &&
        <div className="flex justify-center m-5">
          <span className="loading loading-spinner text-info loading-lg"></span>
        </div>
      }
      {
        !loading && !messages &&
        <h1 className="text-center" >No messages yet, send a message!</h1>
      }
      {
        !loading && messages?.length > 0 &&
        messages.map(message =>
          <div key={message._id} ref={lastMessageRef} >
            <Message message={message} user={user} />
          </div>)
      }
    </div>
  )
}

export default Messages