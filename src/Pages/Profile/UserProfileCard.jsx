import { Button, Spinner, Tooltip } from '@heroui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useContext, useRef } from 'react';
import { CiCalendar, CiLocationOn } from 'react-icons/ci';
import { FaPen } from 'react-icons/fa';
import { toast } from 'react-toastify';
import ProfileImg from '../../Components/UI/ProfileImg';
import { AuthContext } from '../../Contexts/AuthContext';
import { UserContext } from '../../Contexts/UserContext';
import { followUserApi } from '../../Services/followUser';
import uploadProfileImg from '../../Services/UploadProfileImg';
import PostLoadingCard from '../Post/PostLoadingCard';
import ChangePassModal from './ChangePasswordModal';

export default function UserProfileCard({ profileData, isLoading, isMyProfile, postCounts, isFollowing }) {
    const { token } = useContext(AuthContext);
    const { setUserData } = useContext(UserContext);
    const queryClient = useQueryClient();
    const fileInputRef = useRef(null);

    const formattedDate = profileData?.createdAt
        ? new Date(profileData.createdAt).toLocaleDateString('en-US', { dateStyle: 'long' })
        : '';

    const { mutate: uploadPhoto, isPending: isUploading } = useMutation({
        mutationFn: (file) => uploadProfileImg(file, token),
        onSuccess: (data) => {
            // console.log("🚀 ~ UserProfileCard ~ data:", data)
            const newPhoto = data?.data?.photo;
            if (newPhoto) {
                setUserData(prev => {
                    const updated = { ...prev, photo: newPhoto, photoUpdatedAt: Date.now() };
                    localStorage.setItem('userData', JSON.stringify(updated));
                    return updated;
                });
            }
            toast.success('Profile photo updated!');
            queryClient.invalidateQueries({ queryKey: ['myProfile'] });
            queryClient.invalidateQueries({ queryKey: ['posts'] });

        },
        onError: (err) => toast.error(err?.response?.data?.message || 'Failed to update photo'),
    });

    function handleFileChange(e) {
        const file = e.target.files?.[0];
        if (file) uploadPhoto(file);
    }

    function handleFollow() {

        followUser()

    }

    const { mutate: followUser, data: followData, isPending } = useMutation({
        mutationFn: () => followUserApi(profileData._id, token),
        onSuccess: () => {
            toast.success(followData?.data?.following ? "Follow successful" : "Unfollow successful");
            queryClient.invalidateQueries({ queryKey: ['otherUserProfile', profileData._id] });
            queryClient.invalidateQueries({ queryKey: ['myProfile'] });
        },
        onError: () => {
            toast.error("Failed to perform follow/unfollow action");
        }
    })


    if (isLoading) return <PostLoadingCard />;

    return (
        <div className='userCard group rounded-2xl shadow-indigo-700/50 hover:shadow-indigo-500 shadow-[0_0_15px] transition-all '>
            {profileData?.gender === 'male' && (
                <div className="rounded-t-2xl overflow-hidden coverImg w-full bg-linear-to-r from-purple-500 via-indigo-500 to-cyan-500 h-56">
                    {profileData?.cover && <img src={profileData.cover} alt={profileData.name} className="w-full h-full object-cover" />}
                </div>
            )}
            {profileData?.gender === 'female' && (
                <div className="rounded-t-2xl coverImg w-full bg-linear-to-r from-purple-500 via-pink-500 to-cyan-500 h-56" />
            )}

            <div className="mainContent p-4">
                <div className="header relative w-full text-end mb-15"></div>
                    <div className='absolute -translate-y-1/2 backdrop-blur-2xl rounded-full'>
                        {isMyProfile ? (
                            <>
                                <input name='profilePhoto' ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                                <label onClick={() => fileInputRef.current?.click()} className="relative cursor-pointer group/avatar block">
                                    {isUploading
                                        ? <div className="size-40 rounded-full flex items-center justify-center bg-slate-800"><Spinner /></div>
                                        : <Tooltip content="Edit Profile Picture">
                                            <div className="relative">
                                                <ProfileImg size="size-40" user={profileData} />
                                                <span className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover/avatar:opacity-100 transition flex items-center justify-center text-white text-xl">
                                                    <FaPen />
                                                </span>
                                            </div>
                                        </Tooltip>
                                    }
                                </label>
                            </>
                        ) : (
                            <ProfileImg size="size-25 md:size-40" user={profileData} />
                        )}
                    </div>
                    {isMyProfile && <ChangePassModal />}
                </div>

                <div className="details">
                    <h2 className='text-2xl font-bold text-white'>{profileData?.name}</h2>
                    {profileData?.username && <p className='text-sm mb-3'>@{profileData?.username}</p>}

                    <div className='flex my-5 items-center justify-start text-xs text-slate-600 gap-4'>
                        <p className='flex items-center'>
                            <span className="me-1 text-lg text-pink-500"><CiCalendar /></span>
                            Joined <span className='font-semibold ms-1 text-slate-400'>{formattedDate}</span>
                        </p>
                        <p className='flex items-center'>
                            <span className="me-1 text-lg text-emerald-500"><CiLocationOn /></span>
                        </p>
                    </div>

                    <div className='user-card-footer flex text-center items-center justify-evenly border-t pt-4 border-slate-800'>
                        <div className='cursor-pointer'>
                            <p className='transition-all duration-250 group-hover:text-purple-500 text-slate-200 leading-5 text-lg font-bold'>{postCounts}</p>
                            <p className='transition-all duration-250 group-hover:text-purple-700 uppercase text-sm'>Posts</p>
                        </div>
                        <div className='cursor-pointer'>
                            <p className='transition-all duration-250 group-hover:text-cyan-400 text-slate-200 leading-5 text-lg font-bold'>{profileData?.followersCount}</p>
                            <p className='transition-all duration-250 group-hover:text-cyan-700 uppercase text-sm'>Followers</p>
                        </div>
                        <div className='cursor-pointer'>
                            <p className='transition-all duration-250 group-hover:text-emerald-400 text-slate-200 leading-5 text-lg font-bold'>{profileData?.followingCount}</p>
                            <p className='transition-all duration-250 group-hover:text-emerald-700 uppercase text-sm'>Following</p>
                        </div>
                    </div>

                    {!isMyProfile && (
                        <div className='w-full mt-3 flex justify-between items-center'>
                            <Button disabled={isPending} isLoading={isPending} onPress={handleFollow} color="secondary">{isFollowing ? 'Unfollow' : 'Follow'}</Button>
                            <Button onPress={() => toast.info("comming soon", { duration: 1500 })} color="danger">Message</Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
