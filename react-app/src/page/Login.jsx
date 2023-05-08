import { useState } from 'react';
import GuestLayout from '../components/layout/GuestLayout';
import { axiosClient } from '../api/axios/axios-client';
import { useStateContext } from '../context/AuthContext';
import { useForm } from 'react-hook-form';

const Login = () => {
  const [error, setError] = useState(null);
  const { setUser, setTokenToLocal } = useStateContext();
  const { register, handleSubmit } = useForm();
  const loginHandler = (dataToSubmit) => {
    setError(null);
    const loginUser = async () => {
      try {
        const { data } = await axiosClient.post('/login', dataToSubmit);
        setUser(data.user);
        setTokenToLocal(data.token);
      } catch (error) {
        const response = error.response;
        if (response && response.status === 422) {
          if (response.data.errors) {
            setError(response.data.errors);
          } else {
            setError({
              email: [response.data.messages]
            });
          }
        }
      }
    };
    loginUser();
  };
  return (
    <GuestLayout>
      <div className="flex justify-center items-center h-[90vh]">
        <div className=" bg-slate-600 w-4/12 h-[80vh] flex justify-center items-center py-5 pb-10 rounded-lg">
          <form onSubmit={handleSubmit(loginHandler)} className="flex flex-col gap-4 w-6/12">
            <p className="text-center font-bold text-lg text-white">LOGIN </p>
            {error && (
              <div className="bg-red-600 p-3 roundedp">
                {Object.keys(error).map((key) => (
                  <p key={key} className="text-white">
                    {error[key][0]}
                  </p>
                ))}
              </div>
            )}
            <input
              type="text"
              placeholder="email"
              {...register('email')}
              className="border rounded px-3 outline-none py-1 placeholder-yellow-500"
            />
            <input
              type="text"
              placeholder="password"
              {...register('password')}
              className="border rounded px-3 outline-none py-1 placeholder-yellow-500"
            />
            <button type="submit" className=" bg-amber-300 py-2 rounded outline-none">
              Login
            </button>
          </form>
        </div>
      </div>
    </GuestLayout>
  );
};

export default Login;
