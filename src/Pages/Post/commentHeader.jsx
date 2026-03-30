import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@heroui/react";
import { useQueryClient } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { FaPen, FaRegTrashAlt } from "react-icons/fa";
import { HiDotsHorizontal } from "react-icons/hi";
import { IoCopyOutline } from "react-icons/io5";
import { MdOutlineBookmarkAdded, MdOutlineBookmarkRemove } from "react-icons/md";
import { Link } from "react-router";
import { toast } from "react-toastify";
import ProfileImg from '../../Components/UI/ProfileImg';
import { AuthContext } from '../../Contexts/AuthContext';
import { UserContext } from '../../Contexts/UserContext';
import { BookmarkPost } from "../../Services/BookmarkPost";
import timeAgo from "../../Services/DateFormatter";
import { deletePost } from "../../Services/DeletePost";


export default function CommentHeader({ post , comment}) {
    const { token } = useContext(AuthContext);
    const { userData } = useContext(UserContext);
    const [isSaved, setIsSaved] = useState(post?.bookmarked);
    const queryClient = useQueryClient();

    const isMyPost = userData?._id === post?.user?._id;

    const notify = (message) => toast(message);
    async function handleSaveComment() {
        const data = await BookmarkPost(post._id, token)
        setIsSaved(data?.bookmarked)
        notify(data?.bookmarked ? "Post saved successfully" : "Post removed from saved posts")
        queryClient.invalidateQueries({ queryKey: ['posts'] });
    }

    async function handleCopyComment() {
        await navigator.clipboard.writeText(post?.body || '');
        notify("Post content copied to clipboard ✔️")
    }
    function handleEditComment() {





    }
    async function handleDeleteComment() {
        const data = await deletePost(post._id, token)
        console.log("🚀 ~ handleDeleteComment ~ data:", data)
        notify("Post deleted successfully");
        queryClient.invalidateQueries({ queryKey: ['posts'] });
    }


    const PostCreatedAt = timeAgo(post?.createdAt);

    return <div className=' flex px-4 items-center justify-between w-full'>
        <div className="flex items-center justify-start gap-2 w-full">
            <ProfileImg user={post?.user} />
            <div className="text-nowrap text-start">
                <Link to={`/profile/${post?.user?._id}`} className="text-white font-bold group-hover:text-indigo-500 transition">{post?.user?.name}</Link>
                <p className="text-slate-400 font-medium text-xs flex items-center">
                    {post?.user?.username && <span>@{post?.user?.username}</span>}
                    <span className='size-0.75 rounded-full bg-slate-200 mx-2'></span>
                    <span>{PostCreatedAt}</span>
                </p>
            </div>
        </div>
        <Dropdown className="text-slate-400 bg-transparent">
            <DropdownTrigger>
                <Button className="text-xl bg min-w-5 w-fit h-7  hover:text-pink-600 hover:bg-indigo-800 active:scale-95 active:bg-indigo-900 bg-slate-800 transition-all rounded-full">
                    <HiDotsHorizontal /></Button>
            </DropdownTrigger>
            <DropdownMenu className="backdrop-blur-2xl bg-slate-950/50! rounded-2xl shadow-2xl flex flex-col gap-3" aria-label="Static Actions">
                <DropdownItem textValue="Save" className=" text-emerald-600 hover:text-emerald-500  post-actions-menu " key="save"><button onClick={handleSaveComment} className="cursor-pointer w-full items-center flex gap-1 "> {isSaved ? <><MdOutlineBookmarkRemove /> Unsave</> : <><MdOutlineBookmarkAdded /> Save</>}   </button></DropdownItem>
                {post?.body && (
                    <DropdownItem textValue="Copy" className=" text-sky-600	hover:text-sky-500  post-actions-menu " key="copy"><button onClick={handleCopyComment} className="cursor-pointer w-full items-center flex gap-1 "><IoCopyOutline />Copy</button></DropdownItem>
                )}
                {isMyPost && <>
                    <DropdownItem textValue="Edit" className=" text-amber-600 hover:text-amber-500  post-actions-menu " key="edit"><button onClick={handleEditComment} className="cursor-pointer w-full items-center flex gap-1 "><FaPen />Edit</button></DropdownItem>
                    <DropdownItem textValue="Delete" className=" text-rose-600	hover:text-rose-500  post-actions-menu " key="delete"><button onClick={handleDeleteComment} className="cursor-pointer w-full items-center flex gap-1 "><FaRegTrashAlt />Delete</button></DropdownItem>
                </>}
            </DropdownMenu>
        </Dropdown>
    </div>
}