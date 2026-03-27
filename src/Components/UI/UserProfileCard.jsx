import React, { useContext } from 'react'
import ProfileImg from './ProfileImg'
import { CiCalendar } from 'react-icons/ci';
import { CiLocationOn } from 'react-icons/ci';
import { UserContext } from '../../Contexts/UserContext';
import { Button } from '@heroui/react';

export default function UserProfileCard({ myData, className }) {


    const dateObj = new Date(myData?.createdAt);

    const formattedDate = dateObj.toLocaleDateString('en-US', { dateStyle: 'long' },
        {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });



    const { userData } = useContext(UserContext)
    return <div className={`userCard group rounded-2xl shadow-indigo-700/50 hover:shadow-indigo-500 shadow-[0_0_15px] transition-all ${className && className}`} >
        {myData?.gender == "male" && <div className="rounded-t-2xl overflow-hidden coverImg w-full bg-linear-to-r from-purple-500 via-indigo-500 to-cyan-500 h-56">
            {myData?.cover == "" ? "" : <img src={myData?.cover} alt={myData?.name} className="w-full h-full object-cover " />}
        </div>}
        {myData?.gender == "female" && <div className="rounded-t-2xl coverImg w-full bg-linear-to-r from-purple-500 via-pink-500 to-cyan-500 h-56">


        </div>}
        <div className="mainContent p-4">
            <div className="header relative w-full text-end mb-15">
                <div className='absolute -translate-y-1/2 backdrop-blur-2xl rounded-full'>
                    <ProfileImg size={'size-40'} user={myData} />
                </div>
                <button className=" bg-linear-to-l from-purple-600 to-indigo-500 active:scale-85 cursor-pointer transition-all text-white text-sm p-2 rounded-lg font-semibold hover:from-purple-400 hover:to-indigo-400">Edit Profile</button>
            </div>
            <div className="details">

                <h2 className='text-2xl font-bold text-white'>{myData?.name}</h2>
                {myData?.username && <p className='text-sm mb-3'>@{myData?.username}</p>}
                <p className=''>Digital Artist & UI/UX Designer. Exploring the future of interface design. "just for test"</p>

                <div className='flex my-5 items-center justify-start text-xs text-slate-600 gap-4'>
                    <p className='flex items-center'><span className="me-1 text-lg text-pink-500"><CiCalendar /></span> Joined At<span className='font-semibold ms-1 text-slate-400'> {formattedDate}</span></p>
                    <p className='flex items-center'><span className="me-1 text-lg text-emerald-500"><CiLocationOn /></span> <span className=''>San Francisco, CA</span></p>
                </div>

                <div className='user-card-footer flex text-center items-center justify-evenly border-t pt-4 border-slate-800'>
                    <div className=' cursor-pointer  '>
                        <p className='transition-all duration-250 group-hover:text-purple-500 text-slate-200 leading-5 text-lg font-bold'>{myData?.followersCount}</p>
                        <p className='transition-all duration-250 group-hover:text-purple-700 uppercase text-sm'>Posts</p>
                    </div>
                    <div className=' cursor-pointer'>
                        <p className='transition-all duration-250 group-hover:text-cyan-400 text-slate-200 leading-5 text-lg font-bold'>{myData?.followingCount}</p>
                        <p className='transition-all duration-250 group-hover:text-cyan-700 uppercase text-sm'>Followers</p>
                    </div>
                    <div className=' cursor-pointer'>
                        <p className='transition-all duration-250 group-hover:text-emerald-400 text-slate-200 leading-5 text-lg font-bold'>{myData?.bookmarksCount}</p>
                        <p className='transition-all duration-250 group-hover:text-emerald-700 uppercase text-sm'>Following</p>
                    </div>
                </div>
                {(userData?._id != myData?._id) && <div className='w-full  mt-3 flex justify-between items-center'>
                    <Button onPress={() => { console.log('follow me') }} color="secondary"
                        className=""
                    >Follow</Button>
                    <Button onPress={() => { console.log('massage me') }} color="danger"
                        className=""
                    >Massage</Button>
                </div>}
            </div>

        </div>




    </div>
}
