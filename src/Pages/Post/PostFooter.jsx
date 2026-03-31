import { Button } from '@heroui/react';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext, useRef } from "react";
import { BsSendFill } from "react-icons/bs";
import { Link } from 'react-router';
import { toast } from "react-toastify";
import CommentCard from "../../Components/UI/CommentCard";
import ProfileImg from '../../Components/UI/ProfileImg';
import { AuthContext } from "../../Contexts/AuthContext";
import { UserContext } from "../../Contexts/UserContext";
import { SendComment } from "../../Services/SendComment";

export default function PostFooter({ post, isCommenting }) {
    const { userData } = useContext(UserContext)
    const { token } = useContext(AuthContext)
    const commentInput = useRef()
    const queryClient = useQueryClient()
    const { mutate, isPending } = useMutation({
        mutationKey: ['postComment', post?._id],
        mutationFn: commentContent => SendComment(post?._id, commentContent, token),
        onSuccess: () => {
            toast.success("Comment sent successfully")
            queryClient.invalidateQueries({ queryKey: ['posts'] })
        },
        onError: () => {
            toast.error("Failed to send comment")
        },
        retry: false,
    })


    async function handleSendComment() {
        const content = commentInput.current.value.trim()
        if (!content) { toast.error("Comment can't be empty"); return; }
        if (content.length > 500) { toast.error("Comment can't exceed 500 characters"); return; }
        mutate(content)
        commentInput.current.value = ""
    }

    return <div className='px-1 md:px-4 hover:bg-slate-800/50 cursor-pointer transition-all rounded-b-xl border-t py-2 md:py-5 border-slate-800 w-full'>

        {post?.commentsCount ==0 && <p className='text-slate-500 text-xs md:text-base'>No comments yet. Be the first to comment!</p>}
        {post?.topComment && <CommentCard comment={post.topComment} />}

        {post?.commentsCount > 1 && (
            <Link to={`/post/${post?._id}`} className="hover:text-cyan-300 hover:translate-0.5 transition-all text-cyan-400 text-sm">View all {post?.commentsCount} comments</Link>
        )}


        {isCommenting &&
            <div className='comment flex items-center justify-start gap-3 mt-3'>
                <ProfileImg user={userData} size="size-10! " />
                <div className="w-full relative ">
                    <textarea name="comment" rows={3} ref={commentInput} maxLength={500} className="resize-none peer bg-slate-900 focus:bg-slate-800 outline-indigo-800 focus:outline-2 input-fields" placeholder="Write a comment..." />
                    <Button onPress={handleSendComment} className="absolute bg-slate-300 text-indigo-500 hover:bg-slate-200 text-lg inset-e-2 min-w-0 bottom-1/2 translate-y-1/2 " isLoading={isPending}><BsSendFill /></Button>
                </div>
            </div>
        }
    </div>
}