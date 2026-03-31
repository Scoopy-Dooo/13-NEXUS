import { useContext } from 'react';
import { FaRegBell, FaSearch } from 'react-icons/fa';
import { Link } from 'react-router';
import { UserContext } from '../../Contexts/UserContext';
import ProfileImg from './ProfileImg';

export default function HomeHeader() {

    const { userData } = useContext(UserContext)
    console.log("🚀 ~ HomeHeader ~ UserContext:", UserContext)
    return <header className='w-full border-b border-slate-800 p-1 md:p-5 flex justify-between items-center'>
        <div className=" flex w-full items-center justify-between">
            <div className='relative w-11/12  me-1'>
                <input disabled id='postsSearch' className='peer bg-slate-900 focus:bg-slate-800 outline-indigo-800 focus:outline-2 ps-8 input-fields placeholder:text-sm placeholder:text-slate-400 rounded-2xl w-full! ' type="text" placeholder='Search for people, posts, tags...' />
                <span className='peer-focus:text-indigo-400  absolute top-0 bottom-0 left-2  pt-1 text-slate-400  flex items-center'><FaSearch /></span>
            </div>
            <Link to={"/notifications"} className='w-fit text-xl relative'>
                <FaRegBell />
                <span className='size-2.5 animate-blink bg-red-600/80 rounded-full absolute -top-0.5 -right-0.5'></span>
            </Link>
        </div>
        <div className='h-8 mx-2 md:mx-5 block bg-slate-800 w-[0.25px] '></div>
        <Link to={`/profile/${userData?._id}`} className="group w-fit flex items-center justify-center gap-2">
            <div className="text-nowrap text-start">
                <h3 className="group-hover:text-indigo-500 text-white font-bold text-sm">{userData?.name}</h3>
                <p className="text-slate-400 font-medium text-xs">@{userData?.username}</p>
            </div>
            <ProfileImg user={userData} />
        </Link>
    </header>

}
