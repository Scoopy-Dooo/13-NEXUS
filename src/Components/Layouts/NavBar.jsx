import { useContext } from 'react'
import { FiBell, FiHome, FiLogOut, FiUser } from 'react-icons/fi'
import { GoGear } from "react-icons/go"
import { IoChatbubbleOutline } from "react-icons/io5"
import logo from "../../assets/logo2 cut.png"
import { UserContext } from '../../Contexts/UserContext'
import AsideLink from '../UI/AsideLink'
import LogoutModal from '../UI/LogoutModal'

export default function NavBar({ mobile }) {
  const { userData } = useContext(UserContext)

  const links = [
    { name: "home", icon: <FiHome /> },
    { name: "notifications", icon: <FiBell /> },
    { name: "massages", icon: <IoChatbubbleOutline /> },
    { name: `profile/${userData?._id}`, icon: <FiUser /> },
    { name: "settings", icon: <GoGear /> },
  ]

  // Mobile bottom bar
  if (mobile) {
    return <nav className='md:hidden fixed bottom-4 left-0 right-0 z-50 bg-slate-900 border-t border-slate-800 flex items-center justify-around px-2 py-2'>
      {links.map((link, index) => <AsideLink key={index} text={link.name} icon={link.icon} iconOnly />)}
      <LogoutModal trigger={<FiLogOut className='text-xl text-slate-400 hover:text-red-400 transition-all cursor-pointer' />} />
    </nav>
  }

  // Sidebar
  return <aside className='h-full w-full border-r border-slate-800 px-1 lg:px-5'>
    <div className='flex flex-col justify-between sticky top-0 h-screen pt-3 pb-12!'>
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
      <LogoutModal trigger={
        <div className='w-full cursor-pointer'>
          <AsideLink logout text={"logout"} color={"red"} icon={<FiLogOut />} />
        </div>
      } />
    </div>
  </aside>
}
