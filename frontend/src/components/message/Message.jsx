import { useAuthContext } from "../../context/AuthContext"
import relativeTime from "dayjs/plugin/relativeTime"
import dayjs from "dayjs";
import useListenMessages from "../../hooks/useListenMessage";

const Message = ({message, user}) => {
    dayjs.extend(relativeTime);
    const { authUser } = useAuthContext();

    useListenMessages();

    const myMessage = message.senderId === authUser._id;
    const chatPosition = myMessage ? "chat-end" : "chat-start";
    const profilePic = myMessage ? authUser.profilePic : user.profilePic
    const messageBgColor = myMessage ? "bg-blue-500 text-black" : "text-slate-200";
    const shakeClass = message.shouldShake ? "bounce" : ''; 

    return (
        <div className={` chat ${chatPosition} `}>
            <div className="chat-image avatar">
                <div className="w-8 rounded-full">
                    <img alt="Tailwind CSS chat bubble component" src={profilePic} />
                </div>
            </div>
            <div className={`chat-bubble  ${messageBgColor} ${shakeClass}`} >
                {message.message}
            </div>
            <div className="chat-footer opacity-50 text-xs">
                {dayjs().to(dayjs(message.createdAt))}
            </div>
        </div>
    )
}

export default Message