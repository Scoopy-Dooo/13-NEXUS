import { useQuery } from '@tanstack/react-query'
import { useContext } from 'react'
import { useParams } from 'react-router'
import HomeHeader from '../../Components/UI/HomeHeader'
import UserProfileCard from './UserProfileCard'
import { AuthContext } from '../../Contexts/AuthContext'
import { getUserPosts } from '../../Services/GetUserPosts'
import { getMyProfileApi, getProfileApi } from '../../Services/GetUserProfile'
import PostCard from './../Post/PostCard'
import PostLoadingCard from './../Post/PostLoadingCard'
export default function Profile() {
  const { token } = useContext(AuthContext)
  const { userId } = useParams()

  const { isLoading, data: myData } = useQuery({
    queryKey: ['myProfile', userId],
    queryFn: () => getMyProfileApi(token),
  })
  const { data: otherUsersData } = useQuery({
    queryKey: ['otherUserProfile', userId],
    queryFn: () => getProfileApi(userId, token),
  })
  const { isLoading: userPostsLoading, data: userPosts } = useQuery({
    queryKey: ['userPosts', userId],
    queryFn: () => getUserPosts(userId, token),
  })




  return <div>
    {/* header with search and logo  */}
    <HomeHeader />

    <section className="main-user-page my-7 w-9/12 mx-auto ">
      <UserProfileCard isPostLoading={userPostsLoading} isLoading={isLoading} className={""} myData={myData} />

      <div className="userPosts my-6">
        <div className="header mb-4">
          <h1 className='text-white text-2xl '>Recent Activity</h1>
        </div>
        <div className="content grid grid-cols-1 gap-4">

          {userPostsLoading && <PostLoadingCard number={3} />}
          {!userPostsLoading && userPosts?.map((post) => <PostCard key={post._id} post={post} />)}
          {!userPostsLoading && userPosts?.length === 0 && <p className='text-slate-500 text-center py-10'>No posts yet.</p>}
        </div>

      </div>

    </section>


  </div>

}
