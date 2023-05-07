import { Navigate, createBrowserRouter } from "react-router-dom"
import Login from "../page/Login"
import Signup from "../page/Signup"
import User from "../page/User"
import NotFound from "../page/NotFound"
import GuestRoute from "./Guest"
import UserRoute from "./User"
import Dashboard from "../page/Dashboard"
import AddDocument from "../page/AddDocument"

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
        path: '/product',
        element: <Dashboard />
      },
      {
        path: '/product/new',
        element: <AddDocument key={"DocumentAdd"} />
      },
      {
        path: '/product/:id',
        element: <AddDocument key={"DocumentUpdate"} />
      },
    ]
  },

  {
    path: '*',
    element: <NotFound />
  },
])