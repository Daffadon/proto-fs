import Navbar from "../navbar/Navbar"

const GuestLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  )
}

export default GuestLayout