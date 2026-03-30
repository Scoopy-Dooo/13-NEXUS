import { useContext } from 'react';
import { AuthContext } from '../../Contexts/AuthContext';
import { UserContext } from '../../Contexts/UserContext';
import GetAllPosts from '../../Services/GetPosts';
import PostModal from '../Post/PostModal';
import ProfileImg from './../../Components/UI/ProfileImg';
import PostCard from './../Post/PostCard';
import {useQuery} from '@tanstack/react-query';
import HomeHeader from '../../Components/UI/HomeHeader';
import PostLoadingCard from '../Post/PostLoadingCard';
import { CiRedo } from 'react-icons/ci';
import { Button } from '@heroui/react';
export default function Home() {
  const { userData } = useContext(UserContext)
  const { token } = useContext(AuthContext)

  const { data, isLoading, isFetching, isError, refetch } = useQuery({
    queryKey: ['posts'],
    queryFn: () => GetAllPosts(token),
    refetchOnMount: true,
    staleTime: 1000 * 60,
    gcTime: 1000 * 60 * 10,
    refetchInterval: 1000 * 60 * 2,
  
  })

  const posts = data?.data?.posts

  return <>
    <div className='main text-white text-center '>
      <HomeHeader />

      <div className="home relative overflow-hidden p-1 md:p-4">
        {/* <section id='homeAsideProfile' className=""></section> */}


        <section className="addPost rounded-xl group  border-1 border-transparent  hover:border-slate-800 bg-slate-900/50 p-3 addPosts w-full flex items-center justify-start gap-3">
          <ProfileImg user={userData} />
          <div className='relative w-full '>
            <PostModal userData={userData} />
          </div>
        </section>

        <section className="allPosts py-5 grid grid-cols-1 gap-5">
          {isLoading && <PostLoadingCard number={7} />}
          {isError &&
            <div className='fixed inset-0 flex flex-col items-center justify-center gap-2 text-slate-500 text-lg '>
              <div className='bg-slate-900 p-2 rounded-lg text-center'>
                <div className='flex flex-col items-center'>
                  <p className='text-pink-600 text-lg font-semibold'>Oops, something went wrong!</p>
                </div>
                <Button className='flex items-center text-emerald-600 active:scale-95 mt-1  gap-1 m-auto bg-slate-950 p-1 rounded-xl' onPress={refetch}><CiRedo className='text-2xl' />Retry</Button>
              </div>
            </div>}
          {isFetching && !isLoading && (
            <div className='fixed bottom-8 left-1/2 -translate-x-1/2 z-50 animate-bounce flex items-center gap-2 px-4 py-2.5 rounded-full bg-slate-800/90 backdrop-blur-sm border border-slate-700 shadow-lg text-sm text-slate-300'>
              <span className='size-2 rounded-full bg-indigo-700 animate-ping' />
              Loading latest posts...
            </div>
          )}
          {posts?.length === 0 && <p className='text-slate-500 text-lg '>No posts to show</p>}
          {posts?.map((post) => <PostCard key={post._id} post={post} />)}

        </section>
      </div>
    </div>
  </>
}