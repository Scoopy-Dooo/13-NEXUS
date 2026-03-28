import { useContext, useEffect, useState } from "react";
import { BiComment } from "react-icons/bi";
import { BsShare } from "react-icons/bs";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router";
import PostFooter from '../../Components/UI/PostFooter';
import PostHeader from '../../Components/UI/PostHeader';
import { AuthContext } from "../../Contexts/AuthContext";
import { UserContext } from "../../Contexts/UserContext";
import putLikeApi from "../../Services/PutLikeApi";
export default function PostCard({ post }) {
    const [isLiked, setIsLiked] = useState(false);
    const [likesCount, setLikesCount] = useState(post?.likesCount || 0);
    const [isPostingLike, setIsPostingLike] = useState(false);
    const { token } = useContext(AuthContext);
    const { userData } = useContext(UserContext);
    const userId = userData?._id;

    useEffect(() => {
        setLikesCount(post?.likesCount || 0);
        setIsLiked(Array.isArray(post?.likes) ? post.likes.includes(userId) : false);
    }, [post, userId]);

    async function handlePostLike(postId) {
        if (!token) return; // require auth

        setIsPostingLike(true);
        try {
            const data = await putLikeApi(postId, token);
            const liked = data?.data?.liked;

            if (typeof liked === 'boolean') {
                setIsLiked(liked);
                setLikesCount((prev) => (liked ? prev + 1 : Math.max(0, prev - 1)));
            } else {
                setIsLiked((prev) => {
                    const next = !prev;
                    setLikesCount((prevCount) => (next ? prevCount + 1 : Math.max(0, prevCount - 1)));
                    return next;
                });
            }
        } finally {
            setIsPostingLike(false);
        }
    }

    return <div className='postCard group text-start '>
        <PostHeader post={post} />
        <div>
            <Link to={`/post/${post?._id}`} className='mainPostContent  mx-4  mt-2 py-2 border-b border-slate-800'>
                {post?.body && <p className="postContent ps-3 " dir={/^[\u0600-\u06FF]/.test(post.body.trimStart()) ? 'rtl' : 'ltr'}>{post?.body}</p>}
                {post?.image && <div className="postImgWrapper group-hover:shadow-[0_0_10px] shadow-indigo-500 my-5 rounded-xl transition-all overflow-hidden w-full h-fit">
                    <img src={post?.image} alt={post?.image} className="group-hover:scale-105 transition-all w-full h-full object-cover" />
                </div>}
            </Link>
            <div className='flex gap-3 px-4 my-3'>
                <button disabled={isPostingLike} onClick={() => handlePostLike(post?._id)} className="post-footer-icon hover:text-pink-600  ">{isLiked ? <FaHeart className="text-pink-600" /> : <CiHeart className=' text-xl' />}   {likesCount}</button>
                <span className="post-footer-icon hover:text-blue-500  "><BiComment className='' />{post?.commentsCount}</span>
                <span className="post-footer-icon hover:text-emerald-500  "><BsShare className='' />{post?.sharesCount}</span>
            </div>
        </div>
        <PostFooter post={post} />
    </div>
}