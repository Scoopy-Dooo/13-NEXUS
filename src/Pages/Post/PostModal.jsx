import { Button } from "@heroui/react";
import { useContext, useRef, useState } from 'react';
import { CiFaceSmile, CiImageOn } from "react-icons/ci";
import { FiMapPin } from "react-icons/fi";
import { IoIosCloseCircleOutline, IoMdClose } from "react-icons/io";
import sendPost from "../../Services/SendPostApi";
import { AuthContext } from '../../Contexts/AuthContext';
import ProfileImg from '../../Components/UI/ProfileImg';
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const myEmojis = ['😀', '😂', '❤️', '😭', '💚', '⭕', '👍', '🎉', '🔥', '👏', '✨', '😍', '🤔', '😎', '💯', '🚀', '📸', '🎵'];


export default function PostModal({ userData }) {

    const { token } = useContext(AuthContext)
    const queryClient = useQueryClient();
    const [imageUrl, setImageUrl] = useState(null);
    const contentRef = useRef(null);
    const imageRef = useRef(null);
    const [error, setError] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [showEmoji, setShowEmoji] = useState(false);

    const { mutate: submitPost, isPending } = useMutation({
        mutationFn: (data) => sendPost(data, token),
        onSuccess: (res) => {
            toast(res?.message || "Post created successfully!");
            queryClient.invalidateQueries({ queryKey: ['posts'] });
            if (contentRef.current) contentRef.current.value = '';
            if (imageRef.current) imageRef.current.value = '';
            setImageUrl(null);
            setIsOpen(false);
        },
        onError: () => {
            toast.error("Failed to create post, please try again.");
        },
    });

    const handleEmojiClick = (emoji) => {
        const textarea = contentRef.current;
        if (!textarea) return;
        textarea.value += emoji;
        textarea.focus();
        setError('');
        setShowEmoji(false)
    };

    function handleSendPost() {
        const image = imageRef.current?.files?.[0] || null;
        const content = contentRef.current?.value.trim() || '';
        if (!content && !image) {
            setError('Please enter text or select an image before posting.');
            return;
        }
        if (content.length > 500) { setError("Post can't exceed 500 characters"); return; }
        setError('');
        submitPost({ text: content, image });
    }

    function handlecloseModal() {
        setIsOpen(false);
        setImageUrl(null);
    }
    function previewImage() {
        const file = imageRef.current?.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setImageUrl(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setImageUrl(null);
        }
    }

    function openModal() {
        setIsOpen(true);
    }

    function handleClearImage() {
        if (imageRef.current) {
            imageRef.current.value = '';
            setImageUrl(null);
        }
    }

    return <>
        <Button className="w-full relative bg-transparent text-slate-200 max-md:p-0 pe-0 " onPress={openModal} type="button">
            <div className='text-xs sm:text-sm md:text-base text-start cursor-pointer  peer rounded-xl bg-slate-900 focus:bg-slate-800/50 hover:bg-slate-800 border-0 py-2 px-1.5 md:p-3 w-full  transition-all'>
                Whats on your mind, {userData?.name ?? "User"}?</div>
            <span className='peer-focus:text-indigo-400 absolute top-0 max-[320px]:hidden bottom-0 right-10 text-lg flex items-center modalIcons modalIcons  font-bold text-pink-500'><CiImageOn /></span>
            <span className='peer-focus:text-indigo-400 absolute top-0 max-[320px]:hidden bottom-0 right-2 text-lg flex items-center modalIcons  font-bold text-indigo-500'><CiFaceSmile /></span>
        </Button>
        {isOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
                <div className="absolute inset-0 bg-black/50" onClick={handlecloseModal} />
                <div className="relative z-10 w-11/12 max-w-xl rounded-xl bg-slate-900 text-white p-1 md:p-4">
                    <div className="flex items-center justify-between px-2 pb-2 border-b border-slate-800">
                        <p className="font-bold">Create Post</p>
                        <Button className="text-lg" color="danger" variant="flat" onPress={handlecloseModal}>
                            <IoMdClose />
                        </Button>
                    </div>

                    <div className="px-2 py-4 space-y-4">
                        <div className="flex gap-2 items-start">
                            <div className="w-fit"><ProfileImg /></div>
                            <textarea onInput={() => { setError('') }} ref={contentRef} id='postText' className="resize-none w-full h-24 rounded-lg border border-slate-700 bg-slate-950 p-2 outline-none" placeholder="What's on your mind?" />
                        </div>

                        {imageUrl &&
                            <div className=" overflow-hidden relative rounded-lg w-fit m-auto">
                                <Button className="absolute opacity-50 -top-2 -right-6  bg-transparent text-pink-600 " color="danger" size="md" variant="solid" onPress={handleClearImage} >
                                    <IoIosCloseCircleOutline className="text-2xl " />
                                </Button>
                                <img className=" overflow-hidden h-80 w-full object-contain" src={imageUrl} alt="preview" />
                            </div>
                        }
                        {error && (
                            <p className="text-sm text-rose-400">{error}</p>
                        )}
                        <div className="flex items-center justify-between mt-4">
                            <div className="flex items-center gap-2">
                                <label className="modalIcons hover:bg-pink-800 hover:text-pink-300 text-pink-400" htmlFor="postImage"><CiImageOn /></label>
                                <input onChange={previewImage} ref={imageRef} id="postImage" className="hidden" type="file" />
                                <button onClick={() => setShowEmoji(prev => !prev)} className="modalIcons hover:bg-indigo-800 hover:text-indigo-300 text-indigo-400 "><CiFaceSmile /></button>
                                {showEmoji && (
                                    <div className="absolute bottom-12 left-0 max-w-96npm bg-slate-800 rounded-lg p-2 grid grid-cols-5 gap-1 shadow-lg">
                                        {myEmojis.map((emoji, index) => (
                                            <button
                                                key={index}
                                                onClick={() => handleEmojiClick(emoji)}
                                                className="text-2xl hover:scale-125 transition-transform"
                                                type="button"
                                            >
                                                {emoji}
                                            </button>
                                        ))}
                                    </div>
                                )}
                                <span className="modalIcons hover:bg-emerald-800 hover:text-emerald-300 text-emerald-400"><FiMapPin /></span>
                            </div>

                            <button onClick={handleSendPost} disabled={isPending} type="button" className="px-3 py-2 bg-indigo-600 hover:bg-indigo-800 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-all cursor-pointer">
                                {isPending ? 'Posting...' : 'Post'}
                            </button>
                        </div>
                    </div>


                </div>
            </div>
        )}
    </>;
}