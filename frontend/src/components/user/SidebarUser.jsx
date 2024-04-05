import { FaUserPlus } from "react-icons/fa";
import { AiFillMessage } from "react-icons/ai";

const SidebarUser = ({user}) => {
    return (
        <div className="flex items-center justify-between hover:bg-slate-500 p-3 rounded-lg">
            <div className="flex items-center gap-3">
                <div className="avatar w-12 online">
                    <div className="w-12 rounded-full">
                        <img src={user.profilePic} />
                    </div>
                </div>
                <div>
                    <h2 className="text-xl cursor-pointer">
                        { user.fullname }
                    </h2>
                </div>
            </div>
            <div className="flex gap-3 items-center">
                <FaUserPlus size={25} color='#1B9AAA' />
                <AiFillMessage size={22} color="#1DD3B0" />
            </div>
        </div>
    )
}

export default SidebarUser