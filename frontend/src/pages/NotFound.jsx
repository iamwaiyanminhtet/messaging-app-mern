import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="min-h-screen  flex justify-center items-center text-slate-100 p-3  ">
            <div className=" bg-gray-800 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-40 border border-gray-700 p-20 flex flex-col gap-3">
                <h1 className="text-xl font-bold text-center" >404 Not Found </h1>
                <p className="text-center text-sm" >{`The page you are looking for is not here :(`}</p>
                <Link to={'/'} className="flex justify-center" >
                    <button className="btn btn-sm btn-outline btn-info" >Home</button>
                </Link>
            </div>
        </div>
    )
}

export default NotFound