import { useAuthContext } from "../../context/AuthContext"
import relativeTime from "dayjs/plugin/relativeTime"
import dayjs from "dayjs";
import useListenMessages from "../../hooks/useListenMessage";
import { useState } from "react";
import { BsSend } from "react-icons/bs";
import { FaXmark } from "react-icons/fa6";
import useUpdateMessage from "../../hooks/useUpdateMesssage";
import useDeleteMessage from "../../hooks/useDeleteMessage";

const Message = ({ message, user }) => {
    dayjs.extend(relativeTime);
    const { authUser } = useAuthContext();

    useListenMessages();

    const myMessage = message.senderId === authUser._id;
    const chatPosition = myMessage ? "chat-end" : "chat-start";
    const profilePic = myMessage ? authUser.profilePic : user.profilePic
    const messageBgColor = myMessage ? "bg-blue-500 text-black" : "text-slate-200";
    const shakeClass = message.shouldShake ? "bounce" : '';

    const [isEditing, setIsEditing] = useState(false);
    const [messageInput, setMessageInput] = useState(message.message);
    const { loading, updateMessage } = useUpdateMessage();

    const { deleteMessage } = useDeleteMessage();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(messageInput == message.message) setIsEditing(false);
        await updateMessage(messageInput, message._id);
        setIsEditing(false);
    }

    const handleDeleteMessage = async() => {
        await deleteMessage(message._id)
    }

    return (
        <div className={` chat ${chatPosition} `}>
            <div className="chat-image avatar">
                <div className="w-8 rounded-full">
                    <img  src={profilePic} />
                </div>
            </div>
            {!isEditing &&
                <div className={`chat-bubble  ${messageBgColor} ${shakeClass}`} >
                    {message.message}
                </div>}
            {
                isEditing &&
                <form onSubmit={handleSubmit} className='w-2/3 relative'>
                    <textarea
                        type='text'
                        className={`border text-sm rounded-lg block w-full p-2.5  ${myMessage ? "bg-sky-500 border-black text-black " : "bg-gray-600 border-gray-600 text-white"}`}
                        value={messageInput}
                        onChange={(e) => setMessageInput(e.target.value)}
                    ></textarea>
                    <button type='submit' className='absolute inset-y-0 end-0 flex items-center pe-8 '>
                        {loading ? <div className="loading loading-spinner"></div> : <BsSend/>}
                    </button>
                    <button type='button' className='absolute inset-y-0 end-0 flex items-center pe-2'>
                        <FaXmark size={18} onClick={() => setIsEditing(false)} />
                    </button>
                </form>
            }
            <div className="chat-footer opacity-50 text-xs flex gap-3 mt-1">
                <span>{dayjs().to(dayjs(message.createdAt))}</span>
                {
                    message.isEdited && 
                    <span>edited</span>
                }
               {
                myMessage && 
                <>
                <span className="text-sky-500 font-bold cursor-pointer" onClick={() => setIsEditing(true)} >Edit</span>
                <span className="text-red-500 font-bold cursor-pointer" onClick={handleDeleteMessage} >Delete</span>
                </>
               }
            </div>
        </div>
    )
}

export default Message