import { useState } from "react";
import { Link } from "react-router-dom";
import useSignup from "../hooks/useSignup";

const Signup = () => {

  const [formData, setFormData] = useState({});
  const { loading, signup } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(formData);
  }

  return (
    <div className="min-h-screen  flex justify-center items-center text-slate-100 p-3">
      <form onSubmit={handleSubmit} className=" bg-gray-800 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-40 border border-gray-700 p-20 flex flex-col gap-3">
        <div>
          <input type="text" id="fullname" placeholder="Fullname" className="input input-bordered input-primary w-full max-w-xs" 
          onChange={(e) => setFormData({...formData, [e.target.id] : e.target.value}) } />
        </div>
        <div>
          <input type="text" placeholder="Username" className="input input-bordered input-primary w-full max-w-xs" id="username" onChange={(e) => setFormData({...formData, [e.target.id] : e.target.value})} />
        </div>
        <div>
          <input type="password" placeholder="Password" className="input input-bordered input-primary w-full max-w-xs" id="password" onChange={(e) => setFormData({...formData, [e.target.id] : e.target.value})} />
        </div>
        <div>
          <input type="password" placeholder="Confirm Password" className="input input-bordered input-primary w-full max-w-xs" id="confirmPassword" onChange={(e) => setFormData({...formData, [e.target.id] : e.target.value})} />
        </div>
        <select className="select select-primary w-full max-w-xs" id="gender" onChange={(e) => setFormData({...formData, [e.target.id] : e.target.value})}>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <button className='btn btn-primary btn-block mt-2' disabled={loading}>
							{loading ? <span className='loading loading-spinner '></span> : "Sing Up"}
						</button>
        <p className="text-sm text-slate-400">
          {`already have an account?`}
          <Link className="font-semibold ms-2" to={'/signin'}>Sign In</Link>
        </p>
      </form>
    </div>
  )
}

export default Signup;