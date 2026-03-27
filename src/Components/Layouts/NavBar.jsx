import { FiBell, FiHome, FiLogOut, FiUser } from 'react-icons/fi'
import { GoGear } from "react-icons/go"
import { IoChatbubbleOutline } from "react-icons/io5"
import logo from "../../assets/logo2 cut.png"
import AsideLink from '../UI/AsideLink'
import { useContext } from 'react'
import { AuthContext } from '../../Contexts/AuthContext'
import { toast, ToastContainer } from 'react-toastify';
import { UserContext } from '../../Contexts/UserContext'

export default function NavBar() {
  const notify = (massage) => toast(massage)

  const { token, setToken } = useContext(AuthContext)
  const { setUserData } = useContext(UserContext)
  const links = [
    { name: "home", icon: <FiHome /> },
    { name: "notifications", icon: <FiBell /> },
    { name: "massages", icon: <IoChatbubbleOutline /> },
    { name: "profile", icon: <FiUser /> },
    { name: "settings", icon: <GoGear /> },
  ]
  function handleLogOut() {
    setUserData(null)
    notify('logged out successfully :) ')
    console.log('logging out..... ', token);
    setToken(null)
    localStorage.removeItem('token')
    localStorage.removeItem('userData')
  }
  // if (!(token || localStorage.getItem('token'))) { return null }
  return <aside className='relative col-span-1  w-full  pb-12 '>
    <div className='flex flex-col justify-between sticky h-screen border-r border-slate-800 top-0  lg:p-5 pb-12!  '>

      <div className='flex flex-col gap-5 h-full lg:gap-10'>

        <div className="flex flex-wrap max-lg:flex-col justify-start items-center gap-1 lg:gap-2">
          <span className='size-12 p-2 bg-linear-60 from-indigo-900 to-indigo-950 rounded-xl justify-center items-center'><img className='w-full' src={logo} alt="NEXUS logo" /></span>
          <h2 className='lg:text-3xl text-xl text-transparent bg-clip-text bg-linear-120 from-indigo-500 to-indigo-900 font-bold'>
            Nexus
          </h2>
        </div>

        <div className='flex flex-col gap-2 w-full'>
          {links.map((link, index) => <AsideLink key={index} text={link.name} icon={link.icon}></AsideLink>)}
        </div>

      </div>
      <button className='' onClick={handleLogOut}>
        <AsideLink text={"login"} color={"red"} icon={<FiLogOut />}></AsideLink>
      </button>
      <ToastContainer />
    </div>
  </aside>

}
