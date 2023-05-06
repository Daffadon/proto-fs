import { Navigate, Outlet } from "react-router-dom"
import { useStateContext } from "../context/AuthContext"

const GuestRoute = () => {
  const { token } = useStateContext();
  if (token) {
    return <Navigate to={"/dashboard"} />
  }
  return (
    <>
      <Outlet />
    </>
  )
}

export default GuestRoute