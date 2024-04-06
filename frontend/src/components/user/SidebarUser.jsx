import { AiFillMessage } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useSocketContext } from "../../context/SocketContext";


const SidebarUser = ({ user }) => {

    const navigate = useNavigate();
    const goToChat = () => {
        navigate(`/chat/${user.username}`);
    }
    
    const {onlineUsers} = useSocketContext();

    const isOnline = onlineUsers?.includes(user._id)

    return (
        <>
            <div className="flex items-center justify-between hover:bg-slate-500 p-3 rounded-lg ">
                <div className="flex items-center gap-3">
                    <div className={`avatar w-12 ${isOnline ? 'online' : ''}`} >
                        <div className="w-12 rounded-full">
                            <img src={user.profilePic} onClick={() => goToChat()} />
                        </div>
                    </div>
                    <div>
                        <h2 className="text-xl cursor-pointer hover:underline" onClick={() => goToChat()} >
                            {user.fullname}
                        </h2>
                    </div>
                </div>
                <div className="flex gap-3 items-center">
                    {/* <div>
                        add/accept friend features
                    </div> */}
                    <AiFillMessage size={22} color="#1DD3B0" onClick={() => goToChat()} />
                </div>
            </div>
        </>
    )
}

export default SidebarUser