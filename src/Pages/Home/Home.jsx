import { useContext } from 'react';
import { FaRegBell, FaSearch } from "react-icons/fa";
import { Link } from "react-router";
import { AuthContext } from '../../Contexts/AuthContext';
import { UserContext } from '../../Contexts/UserContext';
import GetAllPosts from '../../Services/GetPosts';
import PostModal from './../../Components/UI/PostModal';
import ProfileImg from './../../Components/UI/ProfileImg';
import PostCard from './../Post/PostCard';

import {
  useQuery,
} from '@tanstack/react-query';
import HomeHeader from '../../Components/UI/HomeHeader';
export default function Home() {
  const { userData } = useContext(UserContext)
  const { token } = useContext(AuthContext)

  // console.log("🚀 ~ Home ~ token:", token)
  // console.log('userData from home : ', userData);

  const { data } = useQuery({
    queryKey: ['posts'],
    queryFn: () => GetAllPosts(token),
    refetchOnMount: true,
    staleTime: 1000 * 60, // 1 minute
    gcTimeout: 1000 * 60 * 10, // 10 minutes
    refetchInterval: 1000 * 60 * 2, // 2 minutes 
  })
  const posts = data?.data?.posts

  return <>
    <div className='main text-white text-center '>
      <HomeHeader />

      <div className="home relative overflow-hidden p-4">
        {/* <section id='homeAsideProfile' className=""></section> */}


        <section className="addPost rounded-xl group  border-1 border-transparent  hover:border-slate-800 bg-slate-900/50 p-3 addPosts w-full flex items-center justify-start gap-3">
          <ProfileImg />
          <div className='relative w-full '>
            <PostModal userData={userData} />
          </div>

        </section>

        <section className="allPosts py-5 grid grid-cols-1 gap-5">
          {posts?.map((post) => <PostCard key={post._id} post={post} />)}
        </section>
      </div>

    </div>

  </>
}