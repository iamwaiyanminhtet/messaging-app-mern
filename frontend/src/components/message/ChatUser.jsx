import { IoMdArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import useDeleteConversation from "../../hooks/useDeleteConversation";

const ChatUser = ({ user, convoId }) => {

  const { deleteConversation } = useDeleteConversation();

  const handleDelete = async (e) => {
    e.preventDefault();
    await deleteConversation(convoId);
  }

  return (
    <div className="flex justify-between items-center" >
      <div className="flex items-center gap-3">
        <Link to={'/'} >
          <IoMdArrowRoundBack size={25} />
        </Link>
        <div className="avatar w-12 online">
          <div className="w-12 rounded-full">
            <img src={user.profilePic} />
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <h1>{user.fullname}</h1>
        <p className="text-sm text-slate-400">Active now</p>
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