import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { Link, useParams } from 'react-router';
import { AuthContext } from '../../Contexts/AuthContext';
import { getOnePost } from '../../Services/GetOnePost';
import PostCard from './PostCard';
import HomeHeader from './../../Components/UI/HomeHeader';

export default function PostDetails() {
  const { token } = useContext(AuthContext)
  const { id } = useParams();
  console.log('id from post details  : ', id);

  const { data: post } = useQuery({
    queryKey: ['post', id],
    queryFn: () => getOnePost(id, token),
    onError: (error) => {
      console.log("Error fetching post details:", error);
    },
  });

  console.log("🚀 ~ PostDetails ~ post:", post)

  return <div className=''>
    <HomeHeader />
    <div className='p-5 border-b border-slate-800'>
      <Link to="/"><p className='flex items-center gap-2 text-white hover:text-indigo-500 transition'><FaArrowLeft className='text-2xl' /> Back</p></Link>
    </div>


    <PostCard post={post} />
  </div>
}