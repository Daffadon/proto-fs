import React, { useEffect } from 'react'
import NavbarUser from '../navbar/NavbarUser'
import { axiosClient } from '../../api/axios/axios-client'
import { useStateContext } from '../../context/AuthContext'

const UserLayout = ({ children }) => {
  const { setUser } = useStateContext();
  useEffect(() => {
    const getUserData = async () => {
      const { data } = await axiosClient.get('/user')
      setUser(data)
    }
    getUserData();
  }, [])
  return (
    <>
      <NavbarUser />
      {children}
    </>
  )
}

export default UserLayout