import { useQuery } from '@tanstack/react-query'
import { useContext } from 'react'
import { useParams } from 'react-router'
import HomeHeader from '../../Components/UI/HomeHeader'
import { AuthContext } from '../../Contexts/AuthContext'
import { UserContext } from '../../Contexts/UserContext'
import { getUserPosts } from '../../Services/GetUserPosts'
import { getMyProfileApi, getProfileApi } from '../../Services/GetUserProfile'
import PostCard from './../Post/PostCard'
import PostLoadingCard from './../Post/PostLoadingCard'
import UserProfileCard from './UserProfileCard'
export default function Profile() {
  const { token } = useContext(AuthContext)
  const { userData } = useContext(UserContext)
  const { userId } = useParams()

  const myId = userData?._id

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


  // console.log("🚀 ~ Profile ~ userPosts:", userPosts?.length)
  // console.log("🚀 ~ Profile ~ myData:", myData)
  // console.log("🚀 ~ Profile ~ otherUsersData:", otherUsersData)




  const isMyProfile = userId === myId

  const profileData = isMyProfile ? myData : otherUsersData?.user

  return <div>
    <HomeHeader />

    <section className="main-user-page my-6 px-2 md:px-4">
      <UserProfileCard
      isFollowing={otherUsersData?.isFollowing}
        postCounts={userPosts?.length || 0}
        isLoading={isLoading}
        profileData={profileData}
        isMyProfile={isMyProfile}
        userId={userId}
      />

      <div className="userPosts my-6">
        <div className="header mb-4">
          <h1 className='text-white text-2xl '>Recent Activity</h1>
        </div>
        <div className="content overflow-hidden grid grid-cols-1 gap-4">

          {userPostsLoading && <PostLoadingCard number={3} />}
          {!userPostsLoading && userPosts?.map((post) => <PostCard key={post._id} post={post} />)}
          {!userPostsLoading && userPosts?.length === 0 && <p className='text-slate-500 text-center py-10'>No posts yet.</p>}
        </div>

      </div>

    </section>


  </div>

}
