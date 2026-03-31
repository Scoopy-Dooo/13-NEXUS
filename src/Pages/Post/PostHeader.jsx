import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@heroui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext, useRef, useState } from "react";
import { BsSendFill } from "react-icons/bs";
import { FaPen, FaRegTrashAlt } from "react-icons/fa";
import { HiDotsHorizontal } from "react-icons/hi";
import { IoCopyOutline } from "react-icons/io5";
import { MdOutlineBookmarkAdded, MdOutlineBookmarkRemove, MdOutlineCancel } from "react-icons/md";
import { Link } from "react-router";
import { toast } from "react-toastify";
import ProfileImg from '../../Components/UI/ProfileImg';
import { AuthContext } from '../../Contexts/AuthContext';
import { UserContext } from '../../Contexts/UserContext';
import { BookmarkPost } from "../../Services/BookmarkPost";
import timeAgo from "../../Services/DateFormatter";
import { deletePost } from "../../Services/DeletePost";
import { updatePost } from "../../Services/UpdatePost";

export default function PostHeader({ post }) {
    const { token } = useContext(AuthContext);
    const { userData } = useContext(UserContext);
    const [isSaved, setIsSaved] = useState(post?.bookmarked);
    const [isEditing, setIsEditing] = useState(false);
    const editInputRef = useRef();
    const queryClient = useQueryClient();

    const isMyPost = userData?._id === post?.user?._id;
    const PostCreatedAt = timeAgo(post?.createdAt);

    const { mutate: savePost } = useMutation({
        mutationFn: () => BookmarkPost(post._id, token),
        onSuccess: (data) => {
            setIsSaved(data?.bookmarked);
            toast(data?.bookmarked ? "Post saved" : "Post removed from saved");
            queryClient.invalidateQueries({ queryKey: ['posts'] });
        },
        onError: () => toast.error("Failed to save post"),
    });

    const { mutate: removePost, isPending: isDeleting } = useMutation({
        mutationFn: () => deletePost(post._id, token),
        onSuccess: () => {
            toast.success("Post deleted");
            queryClient.invalidateQueries({ queryKey: ['posts'] });
        },
        onError: () => toast.error("Failed to delete post"),
    });

    const { mutate: editPost, isPending: isUpdating } = useMutation({
        mutationFn: (text) => updatePost(post._id, { text }, token),
        onSuccess: () => {
            toast.success("Post updated");
            queryClient.invalidateQueries({ queryKey: ['posts'] });
            setIsEditing(false);
        },
        onError: () => toast.error("Failed to update post"),
    });

    async function handleCopyPost() {
        await navigator.clipboard.writeText(post?.body || '');
        toast("Post copied to clipboard ✔️");
    }

    function handleEditSubmit() {
        const text = editInputRef.current?.value.trim();
        if (!text) return;
        editPost(text);
    }

    return (
        <div className='flex px-4 items-center justify-between w-full'>
            <div className="flex items-center justify-start gap-2 w-full">
                <ProfileImg user={post?.user} />
                <div className="text-nowrap text-start">
                    <Link to={`/profile/${post?.user?._id}`} className="text-white font-bold group-hover:text-indigo-500 transition">
                        {post?.user?.name}
                    </Link>
                    <p className="text-slate-400 font-medium text-xs flex items-center">
                        {post?.user?.username && <span>@{post?.user?.username}</span>}
                        <span className='size-0.75 rounded-full bg-slate-200 mx-2'></span>
                        <span>{PostCreatedAt}</span>
                    </p>
                    {isEditing && (
                        <div className="flex items-center gap-2 mt-2">
                            <input
                                ref={editInputRef}
                                defaultValue={post?.body}
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
                    )}
                </div>
            </div>

            <Dropdown className="text-slate-400 bg-transparent">
                <DropdownTrigger>
                    <Button className="text-xl min-w-5 w-fit h-7 hover:text-slate-800 hover:bg-indigo-200 active:scale-95 bg-slate-800 transition-all rounded-full">
                        <HiDotsHorizontal />
                    </Button>
                </DropdownTrigger>
                <DropdownMenu className="backdrop-blur-2xl bg-slate-950/50! rounded-2xl shadow-2xl" aria-label="Post Actions">
                    <DropdownItem textValue={isSaved ? "Unsave" : "Save"} onPress={() => savePost()} className="text-emerald-600 hover:text-emerald-500 post-actions-menu" key="save">
                        <span className="w-full items-center flex gap-1">
                            {isSaved ? <><MdOutlineBookmarkRemove /> Unsave</> : <><MdOutlineBookmarkAdded /> Save</>}
                        </span>
                    </DropdownItem>
                    {post?.body && (
                        <DropdownItem textValue="Copy" onPress={handleCopyPost} className="text-sky-600 hover:text-sky-500 post-actions-menu" key="copy">
                            <span className="w-full items-center flex gap-1">
                                <IoCopyOutline />Copy
                            </span>
                        </DropdownItem>
                    )}
                    {isMyPost && (
                        <DropdownItem textValue="Edit" onPress={() => setIsEditing(true)} className="text-amber-600 hover:text-amber-500 post-actions-menu" key="edit">
                            <span className="w-full items-center flex gap-1">
                                <FaPen />Edit
                            </span>
                        </DropdownItem>
                    )}
                    {isMyPost && (
                        <DropdownItem textValue="Delete" onPress={() => removePost()} className="text-rose-600 hover:text-rose-500 post-actions-menu" key="delete">
                            <span className="w-full items-center flex gap-1">
                                {isDeleting ? "Deleting..." : <><FaRegTrashAlt />Delete</>}
                            </span>
                        </DropdownItem>
                    )}
                </DropdownMenu>
            </Dropdown>
        </div>
    );
}
