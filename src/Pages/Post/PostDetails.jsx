import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { Link, useParams } from 'react-router';
import { AuthContext } from '../../Contexts/AuthContext';
import { getOnePost } from '../../Services/GetOnePost';
import PostCard from './PostCard';
import HomeHeader from './../../Components/UI/HomeHeader';
import { Button } from '@heroui/react';
import { getPostLikes } from '../../Services/GetPostLikes';
import PostLoadingCard from './PostLoadingCard';
import ProfileImg from './../../Components/UI/ProfileImg';
import { getPostComments } from '../../Services/GetPostComments';
import CommentCard from '../../Components/UI/CommentCard';

export default function PostDetails() {
  const { token } = useContext(AuthContext)
  const { id } = useParams();

  const { data: post } = useQuery({
    queryKey: ['post', id],
    queryFn: () => getOnePost(id, token),
    onError: (error) => {
      console.log("Error fetching post details:", error);
    },
  });
  const { data: comments } = useQuery({
    queryKey: ['comments', id],
    queryFn: () => getPostComments(id, token),
    onSuccess: (data) => {
      console.log("Comments fetched successfully:", data);
    },
    onError: (error) => {

      console.log("Error fetching post details:", error);
    },
  });





  const { data: postLikes, isLoading, refetch: refetchPostLikes } = useQuery({
    queryKey: ['postLikes', id],
    queryFn: () => getPostLikes(id, token),
    onError: (error) => {
      console.log("Error fetching post details:", error);
    },
    refetchOnReconnect: true,
  });

  return <div className=''>
    <HomeHeader />
    <Link to="/"><p className='p-3 flex w-fit items-center gap-2 text-white hover:text-indigo-500 transition'><FaArrowLeft className='text-xl' /> Back</p></Link>
    <div className='px-4'>

      {isLoading ? <PostLoadingCard /> : <PostCard details={true} post={post} />}
      <div className='w-full my-8  py-2'>
        <Button onPress={refetchPostLikes} className='text-indigo-600 mb-2 text-lg'> {postLikes?.length || 0} likes  </Button>
        {postLikes?.length > 0 && (
          postLikes.map((like) => (
            <p key={like.id} className='text-white flex items-center gap-2 mb-1 text-sm'>
              <ProfileImg user={like} size="size-7" />
              {like?.name || 'Unknown User'} liked this post
            </p>
          ))
        )}
        {comments && (
          <div className='mt-6'>
            <h2 className='text-white mb-4 text-lg'>{comments?.length || 0} Comments</h2>
            {comments.map((comment) => (
              <CommentCard key={comment.id} comment={comment} />
            ))}
          </div>
        )}

      </div>
    </div>
  </div>
}