import LogoutButton from "../components/user/LogoutButton";
import SidebarSearch from "../components/user/SidebarSearch"
import SidebarUser from "../components/user/SidebarUser"
import useGetUsers from "../hooks/useGetUsers"

const Home = () => {

  const { loading, users } = useGetUsers();
  
  return (
    <div className="min-h-screen  flex justify-center items-center text-slate-100 p-5 sm:p-0">
      <div className=" w-full sm:w-1/2 sm:max-w-3xl bg-gray-800 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-40 border border-gray-700 px-5 py-3 flex flex-col gap-5">
        <div>
          <SidebarSearch />
        </div>
        <div className="flex flex-col max-h-[calc(75vh)] overflow-auto gap-2">
          {
            !loading && users.length > 0 &&
            users.map(user => <SidebarUser key={user._id} user={user} />)
          }
        </div>
        {
          loading &&
          <div className="flex justify-center mb-5">
            <span className="loading loading-spinner text-info loading-lg"></span>
          </div>
        }
        <LogoutButton/>
      </div>
    </div>
  )
}

export default Home