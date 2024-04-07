import { Link } from "react-router-dom"

const Header = () => {
  return (
    <div className="flex justify-center gap-5">
        <Link className="underline" to='/' >Home</Link>
        <Link className="underline" to='/user-info' >Profile</Link>
        <a href="https://github.com/iamwaiyanminhtet/messaging-app-mern" target="_blank" className="underline" >Github repo</a>
    </div>
  )
}

export default Header