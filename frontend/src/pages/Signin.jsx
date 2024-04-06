import { useState } from "react";
import { Link } from "react-router-dom";
import useSignin from "../hooks/useSignin";

const Signin = () => {
  const [formData, setFormData] = useState({});
  const { loading, signin } = useSignin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signin(formData);
  }

  return (
    <div className="min-h-screen  flex justify-center items-center text-slate-100 p-3">
      <form onSubmit={handleSubmit} className=" bg-gray-800 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-40 border border-gray-700 p-20 flex flex-col gap-3">
        <div>
          <input type="text" id="username" placeholder="Username" className="input input-bordered input-primary w-full max-w-xs" onChange={(e) => setFormData({...formData, [e.target.id] : e.target.value}) } />
        </div>
        <div>
          <input type="password" id="password" placeholder="Password" className="input input-bordered input-primary w-full max-w-xs" onChange={(e) => setFormData({...formData, [e.target.id] : e.target.value}) } />
        </div>
        <button className="btn  btn-primary">
        {loading ? <span className='loading loading-spinner '></span> : "Sing In"}
        </button>
        <p className="text-sm text-slate-400">
          {`don't have an account?`}
          <Link className="font-semibold ms-2" to={'/signup'}>Sign Up</Link>
        </p>
      </form>
    </div>
  )
}

export default Signin