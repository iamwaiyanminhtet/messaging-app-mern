import { useState } from "react"
import { IoSearchSharp } from "react-icons/io5";

const SidebarSearch = ({searchUser}) => {

    const [search, setSearch] = useState('');

    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            searchUser(search)
        }} >
            <label className="input input-bordered flex items-center gap-2">
                <input type="text" className="grow" placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)}  />
                <IoSearchSharp type="submit" size={25} onClick={() => searchUser(search)}  />
            </label>
        </form>
    )
}

export default SidebarSearch