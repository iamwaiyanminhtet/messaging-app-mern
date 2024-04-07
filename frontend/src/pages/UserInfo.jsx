import { useState } from "react"
import { useAuthContext } from "../context/AuthContext";
import useUpdateUserInfo from "../hooks/useUpdateUserInfo";
import Header from "../components/Header";
import { toast } from "react-toastify";

const UserInfo = () => {

    const { authUser } = useAuthContext();
    const [formData, setFormData] = useState({
    });

    const { loading, updateUserInfo } = useUpdateUserInfo();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await updateUserInfo(formData);
        toast.success("Your information has been updated.", {
            position: "top-center",
            autoClose: 3000,
            theme: "dark",
            draggable: true
        });
    }

    return (
        <div className="min-h-screen  flex justify-center items-center text-slate-100 p-3">
            <form className=" bg-gray-800 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-40 border border-gray-700 p-20 flex flex-col gap-3" onSubmit={handleSubmit} >
                <Header />
                <div className="flex justify-center" >
                <div className="avatar">
                    <div className="w-16 rounded-full">
                        <img src={authUser.profilePic} />
                    </div>
                </div>
                </div>
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Fullname</span>
                    </div>
                    <input type="text" id="fullname" placeholder="Type here" className="input input-bordered w-full max-w-xs" onChange={(e) => setFormData({ ...formData, [e.target.id]: e.target.value })} defaultValue={authUser.fullname} />
                </label>
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Username</span>
                    </div>
                    <input type="text" id="username" placeholder="Type here" className="input input-bordered w-full max-w-xs" onChange={(e) => setFormData({ ...formData, [e.target.id]: e.target.value })} defaultValue={authUser.username} />
                </label>
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Password</span>
                    </div>
                    <input type="password" id="password" placeholder="********" className="input input-bordered w-full max-w-xs" onChange={(e) => setFormData({ ...formData, [e.target.id]: e.target.value })} />
                </label>
                <button type="submit" className='btn btn-primary btn-block mt-2' >
                    {loading ?
                        <span className='loading loading-spinner '></span>
                        : "Update"}
                </button>
            </form>
        </div>
    )
}

export default UserInfo