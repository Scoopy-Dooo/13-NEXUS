import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@heroui/react";
import { FaPen, FaRegTrashAlt } from "react-icons/fa";
import { HiDotsHorizontal } from "react-icons/hi";
import { Link } from "react-router";
import ProfileImg from './ProfileImg';
import { IoCopyOutline } from "react-icons/io5";
import { MdOutlineBookmarkAdded, MdOutlineBookmarkRemove } from "react-icons/md";
import { useContext, useState } from "react";
import { AuthContext } from './../../Contexts/AuthContext';
import { UserContext } from './../../Contexts/UserContext';
import { deletePost } from "../../Services/DeletePost";
import { BookmarkPost } from "../../Services/BookmarkPost";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
export default function PostHeader({ post }) {

    const { token } = useContext(AuthContext);
    const { userData } = useContext(UserContext);
    const [isSaved, setIsSaved] = useState(post?.bookmarked);
    const queryClient = useQueryClient();

    const isMyPost = userData?._id === post?.user?._id;

    const notify = (message) => toast(message);
    async function handleSavePost() {
        const data = await BookmarkPost(post._id, token)
        setIsSaved(data?.bookmarked)
        notify(data?.bookmarked ? "Post saved successfully" : "Post removed from saved posts")
        queryClient.invalidateQueries({ queryKey: ['posts'] });
    }

    async function handleCopyPost() {
        const copiedText = await navigator.clipboard.writeText(post?.body || '');
        console.log("🚀 ~ handleCopyPost ~ copiedText:", copiedText)
        notify("Post content copied to clipboard ✔️")
    }
    function handleEditPost() {

    }
    async function handleDeletePost() {
        const data = await deletePost(post._id, token)
        console.log("🚀 ~ handleDeletePost ~ data:", data)
        notify("Post deleted successfully");
        queryClient.invalidateQueries({ queryKey: ['posts'] });
    }

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            hour12: false,
        });
    }


    return <div className=' flex px-4 items-center justify-between w-full'>
        <div className="flex items-center justify-start gap-2 w-full">
            <ProfileImg user={post?.user} />
            <div className="text-nowrap text-start">
                <Link to={`/profile/${post?.user?._id}`} className="text-white font-bold group-hover:text-indigo-500 transition">{post?.user?.name}</Link>
                <p className="text-slate-400 font-medium text-xs flex items-center">
                    {post?.user?.username && <span>{post?.user?.username}</span>}
                    <span className='size-0.75 rounded-full bg-slate-200 mx-2'></span>
                    <span>{formatDate(post?.createdAt)}</span>
                </p>
            </div>
        </div>
        <Dropdown className="text-slate-400">
            <DropdownTrigger>
                <Button className="text-lg hover:text-white hover:bg-slate-800 transition-all rounded-full">
                    <HiDotsHorizontal /></Button>
            </DropdownTrigger>
            <DropdownMenu className="backdrop-blur-2xl bg-slate-950/50 rounded-2xl shadow-2xl flex flex-col gap-3" aria-label="Static Actions">
                <DropdownItem className=" text-emerald-600 hover:text-emerald-500  post-actions-menu " key="save"><button onClick={handleSavePost} className="w-full items-center flex gap-1 "> {isSaved ? <><MdOutlineBookmarkRemove /> Unsave</> : <><MdOutlineBookmarkAdded /> Save</>}   </button></DropdownItem>
                <DropdownItem className=" text-sky-600	hover:text-sky-500  post-actions-menu " key="copy"><button onClick={handleCopyPost} className="w-full items-center flex gap-1 "><IoCopyOutline />Copy</button></DropdownItem>
                {isMyPost && <>
                    <DropdownItem className=" text-amber-600 hover:text-amber-500  post-actions-menu " key="edit"><button onClick={handleEditPost} className="w-full items-center flex gap-1 "><FaPen />Edit</button></DropdownItem>
                    <DropdownItem className=" text-rose-600	hover:text-rose-500  post-actions-menu " key="delete"><button onClick={handleDeletePost} className="w-full items-center flex gap-1 "><FaRegTrashAlt />Delete</button></DropdownItem>
                </>}
            </DropdownMenu>
        </Dropdown>
    </div>
}