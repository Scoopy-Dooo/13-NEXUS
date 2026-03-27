import React from 'react'
import ProfileImg from './ProfileImg';
import { CiHeart } from "react-icons/ci";
import { Link } from 'react-router';

export default function PostFooter({ post }) {
    // console.log('post from footer : ', post);
    return <div className='px-4 hover:bg-slate-800/50 cursor-pointer transition-all rounded-b-xl border-t py-5 border-slate-800 w-full'>
        {post?.topComment && <div className=' flex items-center justify-start gap-4'>
            <div>
                <ProfileImg user={post?.topComment?.commentCreator} />
            </div>
            <div className="">
                <h3 className='text-white  font-bold'>{post?.topComment?.commentCreator?.name}</h3>
                <p className='text-slate-200 text-sm '>{post?.topComment?.content}</p>
                <p className='flex items-center text-xs text-slate-500'>{post?.topComment?.createdAt}<span className="ms-1 inline-flex items-center active:scale-105 cursor-pointer rounded-lg p-1 hover:bg-pink-600/30 hover:text-pink-700 transition-all duration-300 "><CiHeart className=' text-sm' />{post?.topComment?.likes}</span></p>
            </div>
        </div>}
        <Link to={`/post/${post?._id}`} className="hover:text-cyan-300 hover:translate-0.5 transition-all text-cyan-400 text-sm">View all comments</Link>

    </div>
}