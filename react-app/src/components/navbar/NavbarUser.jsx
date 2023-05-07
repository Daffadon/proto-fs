import React from 'react'
import { axiosClient } from '../../api/axios/axios-client'
import { NavLink } from 'react-router-dom'
import { useStateContext } from '../../context/AuthContext'

const NavbarUser = () => {
  const { user, setTokenToLocal, setUser } = useStateContext();
  const logoutHandler = (e) => {
    e.preventDefault();
    axiosClient.post('/logout').then(() => {
      setTokenToLocal(null);
      setUser({});
    })
  }
  return (
    <div className="flex justify-around items-center h-[10vh]">
      <NavLink to={'/user'} className="bg-lime-200 h-full flex justify-center items-center flex-1">USER</NavLink>
      <NavLink to={'/product'} className="bg-lime-300 h-full flex justify-center items-center flex-1">PRODUCT</NavLink>
      <button onClick={logoutHandler} className='flex-1 bg-red-300 h-full'>LOGOUT</button>
      <p className=' flex justify-center items-center flex-1 text-white font-bold bg-red-600 h-full'>{user.name}</p>
    </div>
  )
}

export default NavbarUser