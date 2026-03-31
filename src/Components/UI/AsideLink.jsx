import { useContext } from 'react';
import { NavLink } from 'react-router';
import { UserContext } from '../../Contexts/UserContext';
export default function AsideLink({ icon, text, color, iconOnly, logout }) {
    const { userData } = useContext(UserContext)



    return <NavLink to={logout ? "" : "/" + (text == "profile" ? ("profile/" + userData?._id) : text)} className="lg:w-full ">
        {({ isActive }) => (
            <div className={`
                ${isActive ?
                    "bg-slate-900 text-white border-indigo-700"
                    : "bg-slate-950 text-slate-400  "
                } ${color ?
                    "hover:bg-red-900/20 hover:text-red-300"
                    : "hover:bg-slate-900 hover:text-white"} w-full  relative overflow-hidden  transition-all  hover:scale-102  flex gap-2 items-center lg:p-3 p-2  rounded-xl lg:rounded-2xl`}>
                <div className={`absolute transition-all md:w-1 w-full lg:w-1.5 h-1.5 md:h-full max-md:bottom-0 max-md:inset-x-0  md:left-0 ${isActive ? "bg-linear-to-b  from-pink-700 to-50% to-indigo-800" : "bg-transparent "} `}></div>
                <p className={` ${isActive ? "text-indigo-600" : "text-inherit"}   flex size-7  rounded-lg text-2xl items-center justify-center transition-all`}>{icon}</p>
                {!iconOnly && <h3 className='text-inherit font-semibold max-lg:hidden text-lg capitalize'>{text}</h3>}
            </div>
        )}
    </NavLink >
}