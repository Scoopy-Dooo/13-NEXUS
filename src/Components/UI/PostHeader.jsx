import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@heroui/react";
import { FaPen, FaRegTrashAlt } from "react-icons/fa";
import { HiDotsHorizontal } from "react-icons/hi";
import { Link } from "react-router";
import ProfileImg from './ProfileImg';
import { IoCopyOutline } from "react-icons/io5";
import { MdOutlineBookmarkAdded, MdOutlineBookmarkRemove } from "react-icons/md";
export default function PostHeader({ post }) {
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
    // console.log('post from post header : ', post?.user);
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
        <div className="">

            <Dropdown className="text-slate-400">
                <DropdownTrigger>
                    <Button className="text-lg hover:text-white hover:bg-slate-800 transition-all rounded-full">
                        <HiDotsHorizontal /></Button>
                </DropdownTrigger>
                <DropdownMenu className="flex flex-col gap-3" aria-label="Static Actions">
                    <DropdownItem className=" text-emerald-600 hover:text-emerald-500  post-actions-menu " key="save"><p className="w-full items-center flex gap-1 "><MdOutlineBookmarkRemove /><MdOutlineBookmarkAdded />Save</p></DropdownItem>
                    <DropdownItem className=" text-sky-600	hover:text-sky-500  post-actions-menu " key="copy"><p className="w-full items-center flex gap-1 "><IoCopyOutline />Copy</p></DropdownItem>
                    <DropdownItem className=" text-amber-600 hover:text-amber-500  post-actions-menu " key="edit"><p className="w-full items-center flex gap-1 "><FaPen />Edit</p></DropdownItem>
                    <DropdownItem className=" text-rose-600	hover:text-rose-500  post-actions-menu " key="delete"><p className="w-full items-center flex gap-1 "><FaRegTrashAlt />Delete</p></DropdownItem>
                </DropdownMenu>
            </Dropdown>

        </div>
    </div>
}