import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Chat from "./components/message/Chat";
import { useAuthContext } from "./context/AuthContext";
import NotFound from "./pages/NotFound";
import UserInfo from "./pages/UserInfo";

const App = () => {
  const { authUser } = useAuthContext();

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={authUser ? <Home /> : <Navigate to={'signin'} />} />
          <Route path="/signin" element={authUser ? <Navigate to={'/'} /> : <Signin />} />
          <Route path="/signup" element={authUser ? <Navigate to={'/'} /> : <Signup />} />
          <Route path="/chat/:username" element={authUser ? <Chat /> : <Navigate to={'/signin'} />} />
          <Route path="/user-info" element={authUser ? <UserInfo /> : <Navigate to={'/signin'} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </div>
  )
}

export default App;