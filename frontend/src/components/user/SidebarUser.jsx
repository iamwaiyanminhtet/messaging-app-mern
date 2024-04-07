import { AiFillMessage } from "react-icons/ai";
import { FaUserPlus, FaUserFriends } from "react-icons/fa";
import { FaUserCheck } from "react-icons/fa6";
import { RiUserShared2Fill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { useSocketContext } from "../../context/SocketContext";
import { useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import useFriendRequest from "../../hooks/useFriendRequest";
import useFriendAccept from "../../hooks/useFriendAccept";


const SidebarUser = ({ user }) => {

    const { authUser } = useAuthContext();
    const navigate = useNavigate();
    const goToChat = () => {
        navigate(`/chat/${user.username}`);
    }

    const { onlineUsers } = useSocketContext();
    const isOnline = onlineUsers?.includes(user._id);

    const { loading: friendReqLoading, sendFriendRequest } = useFriendRequest();
    const { loading: acceptFriendLoading, acceptFriendRequest } = useFriendAccept();

    const [hasAlreadyFriendRequest, setHasAlreadyFriendRequest] = useState(user?.friendRequests?.includes(authUser._id));
    const [hasFriendRequestToCurUser, setHasFriendRequestToCurUser] = useState(authUser?.friendRequests?.includes(user._id));
    const [alreadyFriend, setAlreadyFriend] = useState(authUser?.friends?.includes(user._id) || user?.friends?.includes(authUser._id));

    const handleAddFriend = async () => {
        const success = await sendFriendRequest(user._id);
        if (success) {
            setHasAlreadyFriendRequest(true)
        }
    }

    const handleAcceptFriend = async () => {
        const success = await acceptFriendRequest(user._id);
        if (success) {
            setAlreadyFriend(true)
        }
    }

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
                    <div>
                        {
                            (friendReqLoading || acceptFriendLoading) &&
                            <div className="loading loading-spinner"></div>
                        }
                        {
                            !friendReqLoading && !acceptFriendLoading && !hasAlreadyFriendRequest && !hasFriendRequestToCurUser &&
                            !alreadyFriend &&
                            <FaUserPlus size={25} onClick={handleAddFriend} />
                        }
                        {
                            !friendReqLoading && !acceptFriendLoading && hasAlreadyFriendRequest &&
                            !hasFriendRequestToCurUser &&
                            !alreadyFriend &&
                            <RiUserShared2Fill size={25} />
                        }
                        {
                            !friendReqLoading && !acceptFriendLoading && hasFriendRequestToCurUser &&
                            !alreadyFriend &&
                            <FaUserCheck size={25} onClick={handleAcceptFriend} />
                        }
                        {
                            !friendReqLoading && !acceptFriendLoading && alreadyFriend && !hasAlreadyFriendRequest &&
                            <FaUserFriends size={25} />
                        }
                    </div>
                    <AiFillMessage size={22} color="#1DD3B0" onClick={() => goToChat()} />
                </div>
            </div>
        </>
    )
}

export default SidebarUser