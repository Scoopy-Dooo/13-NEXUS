import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@heroui/react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useContext, useRef, useState } from 'react'
import { BsSendFill } from 'react-icons/bs'
import { CiHeart } from 'react-icons/ci'
import { FaHeart, FaPen, FaRegTrashAlt } from 'react-icons/fa'
import { HiDotsHorizontal } from 'react-icons/hi'
import { IoCopyOutline } from 'react-icons/io5'
import { MdOutlineCancel } from 'react-icons/md'
import { toast } from 'react-toastify'
import { AuthContext } from '../../Contexts/AuthContext'
import { UserContext } from '../../Contexts/UserContext'
import timeAgo from '../../Services/DateFormatter'
import { deletePostComment } from '../../Services/DeleteComment'
import { likePostComment } from '../../Services/LikePostComment'
import { updatePostComment } from '../../Services/UpdatePostComment'
import ProfileImg from './ProfileImg'

export default function CommentCard({ comment }) {
    const { token } = useContext(AuthContext);
    const { userData } = useContext(UserContext);
    const queryClient = useQueryClient();
    const editInputRef = useRef();
    const [isEditing, setIsEditing] = useState(false);

    const isMyComment = userData?._id === comment?.commentCreator?._id;
    const iLiked = comment?.likes?.includes(userData?._id);

    const { mutate: updateComment, isPending: isUpdating } = useMutation({
        mutationFn: (content) => updatePostComment(comment?.post, comment?._id, content, token),
        onSuccess: () => {
            toast.success("Comment updated successfully");
            queryClient.invalidateQueries({ queryKey: ['posts'] });
            setIsEditing(false);
        },
        onError: () => toast.error("Failed to update comment"),
    });

    const { mutate: deleteComment, isPending: isDeleting } = useMutation({
        mutationFn: () => deletePostComment(comment?.post, comment?._id, token),
        onSuccess: () => {
            toast.success("Comment deleted successfully");
            queryClient.invalidateQueries({ queryKey: ['posts'] });
        },
        onError: () => toast.error("Failed to delete comment"),
    });

    function handleEditSubmit() {
        const content = editInputRef.current?.value.trim();
        if (!content) return;
        updateComment(content);
        queryClient.invalidateQueries({ queryKey: ['posts'] });
        queryClient.invalidateQueries({ queryKey: ['comments ', comment?.post]});
    }

    async function handleCopyComment() {
        await navigator.clipboard.writeText(comment?.content || '');
        toast("Comment copied to clipboard ✔️");
    }
    async function handleLikeComment() {
        console.log("liking");
        likeComment();

    }

    const { mutate: likeComment, data: likingData, isPending: isLiking } = useMutation({
        mutationFn: () => likePostComment(comment?.post, comment?._id, token),
        onSuccess: () => {
            console.log('likingData : ', likingData);
            // likingData.liked = !likingData.liked

            toast.success("Comment liked successfully");
            queryClient.invalidateQueries({ queryKey: ['posts'] });
        },
        onError: () => toast.error("Failed to like comment"),

    });



    return (
        <div className='w-full flex items-start justify-start gap-4 py-2'>
            <ProfileImg user={comment?.commentCreator} />
            <div className="w-full">
                <div className="flex items-center justify-between">
                    <h3 className='text-white font-bold'>{comment?.commentCreator?.name}</h3>
                    <Dropdown className="text-slate-400 bg-transparent">
                        <DropdownTrigger>
                            <Button className="text-xl min-w-5 w-fit h-4 hover:text-indigo-500 hover:bg-slate-800 active:scale-95 bg-slate-800 transition-all rounded-full">
                                <HiDotsHorizontal />
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu className="backdrop-blur-2xl bg-slate-950/50! rounded-2xl shadow-2xl" aria-label="Comment Actions">
                            <DropdownItem textValue="Copy" onPress={handleCopyComment} className="text-sky-600 hover:text-sky-500 post-actions-menu" key="copy">
                                <span className="cursor-pointer w-full items-center flex gap-1">
                                    <IoCopyOutline />Copy
                                </span>
                            </DropdownItem>
                            {isMyComment && (
                                <DropdownItem textValue="Edit" onPress={() => setIsEditing(true)} className="text-amber-600 hover:text-amber-500 post-actions-menu" key="edit">
                                    <span className="cursor-pointer w-full items-center flex gap-1">
                                        <FaPen />Edit
                                    </span>
                                </DropdownItem>
                            )}
                            {isMyComment && (
                                <DropdownItem textValue="Delete" onPress={() => deleteComment()} className="text-rose-600 hover:text-rose-500 post-actions-menu" key="delete">
                                    <span className="cursor-pointer w-full items-center flex gap-1">
                                        <FaRegTrashAlt />Delete
                                    </span>
                                </DropdownItem>
                            )}
                        </DropdownMenu>
                    </Dropdown>
                </div>



                {isEditing ? (
                    <div className="flex items-center gap-2 mt-1">
                        <input
                            name='newComment'
                            ref={editInputRef}
                            defaultValue={comment?.content}
                            className="input-fields text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 flex-1"
                            autoFocus
                        />
                        <Button isLoading={isUpdating} onPress={handleEditSubmit} className="min-w-0 bg-indigo-700 text-white p-2">
                            <BsSendFill />
                        </Button>
                        <Button onPress={() => setIsEditing(false)} className="min-w-0 bg-slate-700 text-white p-2">
                            <MdOutlineCancel />
                        </Button>
                    </div>
                ) : (
                    <p className='text-slate-200 text-sm'>{comment?.content}</p>
                )}

                <p className='flex items-center text-xs text-slate-500 mt-1'>
                    {timeAgo(comment?.createdAt)}
                    <Button onPress={handleLikeComment} isLoading={isLiking} dir='rtl' className="hover:bg-slate-700 h-fit p-1 me-1 inline-flex items-center active:scale-105 cursor-pointer rounded-lg min-w-0 w-fit   bg-transparent  hover:text-pink-700 transition-all duration-300 text-pink-600 text-sm">
                        {comment?.likes.length || 0}
                        {iLiked ? <FaHeart className='' /> : <CiHeart className=' ' />}
                    </Button>
                    {isDeleting && <span className="ms-2 text-rose-400">Deleting...</span>}
                </p>
            </div>
        </div>
    );
}
