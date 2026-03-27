import { useQuery } from '@tanstack/react-query'
import { useContext } from 'react'
import { useParams } from 'react-router'
import HomeHeader from '../../Components/UI/HomeHeader'
import UserProfileCard from '../../Components/UI/UserProfileCard'
import { AuthContext } from '../../Contexts/AuthContext'
import { getUserPosts } from '../../Services/GetUserPosts'
import { getMyProfileApi, getProfileApi } from '../../Services/GetUserProfile'
import PostCard from './../Post/PostCard'
export default function Profile() {
  const { token } = useContext(AuthContext)
  const { userId } = useParams()
  console.log("🚀 ~ Profile ~ userId:", userId)

  const { data: myData } = useQuery({
    queryKey: ['myProfile', userId],
    queryFn: () => getMyProfileApi(token),
  })
  const { data: otherUsersData } = useQuery({
    queryKey: ['otheUserProfile', userId],
    queryFn: () => getProfileApi(userId, token),
  })
  const { data: userPosts } = useQuery({
    queryKey: ['userPosts', userId],
    queryFn: () => getUserPosts(userId, token),
  })
  console.log("🚀 ~ Profile ~ userPosts:", userPosts)
  console.log("🚀 ~ Profile ~ myData:", myData)
  console.log("🚀 ~ Profile ~ otherUsersData:", otherUsersData)
  console.log("🚀 ~ Profile ~ userId to api :", userId)


  

  return <div>
    {/* header with search and logo  */}
    <HomeHeader />

    <section className="main-user-page my-7 w-9/12 mx-auto ">
      <UserProfileCard className={""} myData={myData} />

      <div className="userPosts my-6">
        <div className="header mb-4">
          <h1 className='text-white text-2xl '>Posts</h1>
        </div>
        <div className="content grid grid-cols-1 gap-4">

          {userPosts?.map((post) => <PostCard key={post._id} post={post} />)}

        </div>

      </div>

    </section>
 
  
  </div>

}

// {
//     "_id": "69b4081f056bdb76270ddb2a",
//     "id": "69b4081f056bdb76270ddb2a"
//     "photo": "https://pub-3cba56bacf9f4965bbb0989e07dada12.r2.dev/linkedPosts/default-profile.png",
//
//
//     "name": "Nonono123",
//     "username": "nonono123",
//     "email": "nonono123@gmail.com",
//     "dateOfBirth": "2026-03-26T00:00:00.000Z",
//     "gender": "male",
//     "cover": "",
//     "bookmarks": [],
//     "followers": [],
//     "following": [],
//     "createdAt": "2026-03-13T12:50:39.219Z",
//     "followersCount": 0,
//     "followingCount": 0,
//     "bookmarksCount": 0,
// }
// {
//     "isFollowing": false,
//     "user": {
//         "_id": "69b4081f056bdb76270ddb2a",
//         "name": "Nonono123",
//         "username": "nonono123",
//         "email": "nonono123@gmail.com",
//         "dateOfBirth": "2026-03-26T00:00:00.000Z",
//         "gender": "male",
//         "photo": "https://pub-3cba56bacf9f4965bbb0989e07dada12.r2.dev/linkedPosts/default-profile.png",
//         "cover": "",
//         "followers": [],
//         "following": [],
//         "createdAt": "2026-03-13T12:50:39.219Z",
//         "followersCount": 0,
//         "followingCount": 0,
//         "bookmarksCount": 0,
//         "id": "69b4081f056bdb76270ddb2a"
//     }
// }