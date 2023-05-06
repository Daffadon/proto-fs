import { createContext, useContext, useState } from "react";


const stateContext = createContext({
  user: null,
  token: null,
  setUser: () => { },
  setTokenToLocal: () => { }
})

export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [token, setToken] = useState(localStorage.getItem('ACCESS_TOKEN'));

  const setTokenToLocal = token => {
    setToken(token);
    if (token) {
      localStorage.setItem('ACCESS_TOKEN', token);
    } else {
      localStorage.removeItem('ACCESS_TOKEN')
    }
  }

  return (
    <stateContext.Provider value={{
      user,
      token,
      setUser,
      setTokenToLocal
    }}>
      {children}
    </stateContext.Provider>
  )
}

export const useStateContext = () => useContext(stateContext); 