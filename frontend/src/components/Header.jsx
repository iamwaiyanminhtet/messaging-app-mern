import { Link } from "react-router-dom"

const Header = () => {
  return (
    <div className="flex justify-center gap-5">
        <Link className="hover:underline" to='/' >Home</Link>
        <a href="https://github.com/iamwaiyanminhtet/messaging-app-mern" target="_blank" className="hover:underline" >Github repo</a>
    </div>
  )
}

export default Header