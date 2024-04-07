import LogoutButton from "../components/user/LogoutButton";
import SidebarSearch from "../components/user/SidebarSearch"
import SidebarUser from "../components/user/SidebarUser"
import useGetUsers from "../hooks/useGetUsers"
import useUsers from "../zustand/useUsers";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useListenFriendRequest, { useListenFriendAccept } from "../hooks/useListenFriendRequestAndAccept";
import { useAuthContext } from "../context/AuthContext";

const Home = () => {

  // request a friend socketio emit
  const response = useListenFriendRequest();
  const { setAuthUser } = useAuthContext();
  useEffect(() => {
    if (response) {
      setAuthUser(response.user)
      toast.info(`${response.message}, Please refresh the page to accept the request!`, {
        position: "top-center",
        autoClose: 5000,
        theme: "dark",
        draggable: true
      });
    }
  }, [response, setAuthUser]);

  const { acceptResponse } = useListenFriendAccept();
  useEffect(() => {
    if (acceptResponse) {
      setAuthUser(acceptResponse.user)
      toast.info(`${acceptResponse.message}, Please refresh the page to see friend icon!`, {
        position: "top-center",
        autoClose: 5000,
        theme: "dark",
        draggable: true
      });
    }
  }, [acceptResponse, setAuthUser]);

  const { loading } = useGetUsers();
  const { sidebarUsers } = useUsers();
  const [filterUser, setFilterUser] = useState([]);
  // const searchUser = (username) => {
  //   console.log('username')
  //   console.log(username)
  //   if (!username || username === '') {
  //     setFilterUser(sidebarUsers)
  //     return;
  //   } else {
  //     setFilterUser(sidebarUsers.filter(sb => {
  //       return sb.fullname.toLowerCase().includes(username.toLowerCase()) || sb.fullname.split(' ').join('').toLowerCase().includes(username.toLowerCase())
  //     }))
  //   }
  // }

  const searchUser = (username) => {
    const sanitizeSearch = username.trim().toLowerCase();
  
    if (!sanitizeSearch) {
      setFilterUser(sidebarUsers);
      return;
    }
  
    const filteredUsers = sidebarUsers.filter(({ fullname }) => {
      const normalizedFullName = fullname.toLowerCase().replace(/\s/g, '');
      return normalizedFullName.includes(sanitizeSearch);
    });
  
    setFilterUser(filteredUsers);
  };

  return (
    <div className="min-h-screen  flex justify-center items-center text-slate-100 p-5 sm:p-0">
      <div className=" w-full sm:w-1/2 sm:max-w-3xl bg-gray-800 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-40 border border-gray-700 px-5 py-3 flex flex-col gap-5">
        <div>
          <SidebarSearch searchUser={searchUser} />
        </div>
        <div className="flex flex-col max-h-[calc(75vh)] overflow-auto gap-2">
          {
            !loading && sidebarUsers.length > 0 && filterUser.length === 0 &&
            sidebarUsers.map(user => <SidebarUser key={user._id} user={user} />)
          }

          {
            !loading && filterUser.length > 0 &&
            filterUser.map(user => <SidebarUser key={user._id} user={user} />)
          }
        </div>
        {
          loading &&
          <div className="flex justify-center mb-5">
            <span className="loading loading-spinner text-info loading-lg"></span>
          </div>
        }
        <LogoutButton />
      </div>
    </div>
  )
}

export default Home