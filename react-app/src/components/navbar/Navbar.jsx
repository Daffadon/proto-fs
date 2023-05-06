import { NavLink } from "react-router-dom"

const Navbar = () => {
  return (
    <div className="flex justify-around items-center h-[10vh]">
      <NavLink to={'/login'} className="bg-lime-200 h-full flex justify-center items-center w-6/12">Login</NavLink>
      <NavLink to={'/signup'} className="bg-lime-300 h-full flex justify-center items-center w-6/12">SignUp</NavLink>
    </div>
  )
}

export default Navbar