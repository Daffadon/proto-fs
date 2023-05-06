import { Navigate, createBrowserRouter } from "react-router-dom"
import Login from "../page/Login"
import Signup from "../page/Signup"
import User from "../page/User"
import NotFound from "../page/NotFound"
import GuestRoute from "./Guest"
import UserRoute from "./User"
import Dashboard from "../page/Dashboard"

export const router = createBrowserRouter([
  {
    path: '/',
    element: <GuestRoute />,
    children: [
      {
        path: '/',
        element: <Login />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/signup',
        element: <Signup />
      },
    ]
  },
  {
    path: '/',
    element: <UserRoute />,
    children: [
      {
        path: '/',
        element: <Navigate to={'/dashboard'} />
      },
      {
        path: '/user',
        element: <User />
      },
      {
        path: '/dashboard',
        element: <Dashboard />
      },
    ]
  },

  {
    path: '*',
    element: <NotFound />
  },
])