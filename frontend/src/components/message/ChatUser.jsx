import { IoMdArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import {toast} from "react-toastify";
import useDeleteConversation from "../../hooks/useDeleteConversation";
import { useSocketContext } from "../../context/SocketContext";

const ChatUser = ({ user, convoId }) => {

  const { deleteConversation } = useDeleteConversation();
  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers?.includes(user._id);

  const handleDelete = async (e) => {
    e.preventDefault();
    if (convoId) await deleteConversation(convoId);
    else toast.warning("No messages to delete.", {
      position: "top-center",
      autoClose: 3000,
      theme: "dark",
      draggable: true
  });
  }

  return (
    <div className="flex justify-between items-center" >
      <div className="flex items-center gap-3">
        <Link to={'/'} >
          <IoMdArrowRoundBack size={25} />
        </Link>
        <div className={`avatar w-12 ${isOnline ? "online" : '' } `}>
          <div className="w-12 rounded-full">
            <img src={user.profilePic} />
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <h1>{user.fullname}</h1>
        <p className="text-sm text-slate-400">{isOnline ? "Active Now" : ""}</p>
      </div>
      <div className="">
          <button type="button" className="bg-red-600 text-black p-2 rounded-lg" onClick={handleDelete} >
            <MdDelete size={20} />
          </button>
      </div>
    </div>
  )
}

export default ChatUser