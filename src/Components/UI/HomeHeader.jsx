import React, { useContext } from 'react'
import { UserContext } from '../../Contexts/UserContext'
import { FaRegBell, FaSearch } from 'react-icons/fa'
import { Link } from 'react-router';
import ProfileImg from './ProfileImg';

export default function HomeHeader() {

    const {userData}  = useContext(UserContext)
     console.log("🚀 ~ HomeHeader ~ userData:", userData)


    return <header className='w-full border border-slate-800 p-5 flex justify-between items-center'>
        <div className=" flex w-full items-center justify-between">
            <div className='relative w-11/12  me-1'>
                <input id='postsSearch' className='peer bg-slate-900 focus:bg-slate-800 outline-indigo-800 focus:outline-2 ps-8 input-fields placeholder:text-sm placeholder:text-slate-400 rounded-2xl w-full! ' type="text" placeholder='Search for people, posts, tags...' />
                <span className='peer-focus:text-indigo-400  absolute top-0 bottom-0 left-2  pt-1 text-slate-400  flex items-center'><FaSearch /></span>
            </div>
            <Link to={"/notifications"} className='w-fit text-xl relative'><FaRegBell />
                <span className='size-2.5 bg-red-600/80 rounded-full absolute -top-0.5 -right-0.5'></span>
            </Link>

        </div>
        <div className='h-8 mx-5 block bg-slate-800 w-[0.25px] '></div>
        <div className="w-fit flex items-center justify-center gap-2">
            <div className="text-nowrap">
                <h3 className="text-white font-bold text-sm">{userData?.name}</h3>
                <p className="text-slate-400 font-medium text-xs">@{userData?.username}</p>
            </div>
            <ProfileImg user={userData?.photo} />
        </div>
    </header>

}
