import { useState } from 'react';
import GuestLayout from '../components/layout/GuestLayout'
import { axiosClient } from '../api/axios/axios-client';
import { useStateContext } from '../context/AuthContext';

const Signup = () => {

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [error, setError] = useState(null)
  const { setUser, setTokenToLocal } = useStateContext()
  const signUpHandler = ev => {
    ev.preventDefault()
    const payload = {
      name,
      email,
      password,
      password_confirmation: password
    }
    const signUp = async () => {
      try {
        const { data } = await axiosClient.post('/signup', payload);
        setUser(data.user)
        setTokenToLocal(data.token);
      } catch (error) {
        const response = error.response
        if (response && response.status === 422) {
          setError(response.data.errors)
        }
      }
    }
    signUp()
  }
  return (
    <GuestLayout>
      <div className="flex justify-center items-center h-[90vh]">
        <div className=' bg-slate-600 w-4/12 h-[80vh] flex justify-center items-center py-5 pb-10 rounded-lg '>
          <form onSubmit={signUpHandler} className="flex flex-col gap-4 w-6/12">
            <p className="text-center font-bold text-lg text-white">SIGNUP FORM</p>
            {error &&
              <div className='bg-red-600 p-3 roundedp'>
                {Object.keys(error).map(key => (
                  <p key={key} className='text-white'>{error[key][0]}</p>
                ))}
              </div>
            }
            <input type="text" value={name}
              onChange={e => {
                setName(e.target.value)
              }}
              placeholder="fullname" className="border rounded px-3 outline-none py-1 placeholder-yellow-500" />
            <input type="email" value={email}
              onChange={e => {
                setEmail(e.target.value)
              }}
              placeholder="email" className="border rounded px-3 outline-none py-1 placeholder-yellow-500" />
            <input type="password" value={password}
              onChange={e => {
                setPassword(e.target.value)
              }}
              placeholder="password" className="border rounded px-3 outline-none py-1 placeholder-yellow-500" />
            <input type="password" value={rePassword}
              onChange={e => {
                setRePassword(e.target.value)
              }}
              placeholder="repasword" className="border rounded px-3 outline-none py-1 placeholder-yellow-500" />
            <button type="submit" className=" bg-amber-300 py-2 rounded outline-none">Sign Up</button>
          </form>
        </div>
      </div>
    </GuestLayout>
  )
}

export default Signup