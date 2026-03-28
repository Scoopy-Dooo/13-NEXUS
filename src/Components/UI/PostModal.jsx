import { Button } from "@heroui/react";
import { useContext, useRef, useState } from 'react';
import { CiFaceSmile, CiImageOn } from "react-icons/ci";
import { FiMapPin } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import sendPost from "../../Services/SendPostApi";
import { AuthContext } from './../../Contexts/AuthContext';
import ProfileImg from './ProfileImg';
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";

const myEmojis = ['😀', '😂', '❤️', '😭', '💚', '⭕', '👍', '🎉', '🔥', '👏', '✨', '😍', '🤔', '😎', '💯', '🚀', '📸', '🎵'];


export default function PostModal({ userData }) {

    const { token } = useContext(AuthContext)
    const queryClient = useQueryClient();
    const [imageUrl, setImageUrl] = useState(null);
    const contentRef = useRef(null);
    const imageRef = useRef(null);
    const [error, setError] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const notify = (massages) => toast(massages);
    const [showEmoji, setShowEmoji] = useState(false);

    const handleEmojiClick = (emoji) => {
        const textarea = contentRef.current;
        if (!textarea) return;
        textarea.value += emoji;
        textarea.focus();
        setError('');
        setShowEmoji(false)
    };

    async function handleSendPost() {
        const image = imageRef.current?.files?.[0] || null;
        const content = contentRef.current?.value.trim() || '';

        // Require at least one of text or image
        if (!content && !image) {
            setError('Please enter text or select an image before posting.');
            return;
        }
        setError('');


        // this data will send to API
        const data = {
            text: content,
            image: image,
        }
        // api calls here to send post data to backend
        const res = await sendPost(data, token);

        notify(res?.message || "Post created successfully!");
        queryClient.invalidateQueries({ queryKey: ['posts'] });

        // reset all values
        if (contentRef.current) contentRef.current.value = '';
        if (imageRef.current) imageRef.current.value = '';
        setImageUrl(null);
        setIsOpen(false);
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

    return <>
        <Button className="w-full relative pe-0 " onPress={openModal} type="button">
            <div className='text-start cursor-pointer  peer rounded-xl bg-slate-900 focus:bg-slate-800/50 hover:bg-slate-800 border-0 p-3   w-full  transition-all'>
                Whats on your mind, {userData?.name ?? "User"}?</div>
            <span className='peer-focus:text-indigo-400 absolute top-0 bottom-0 right-10 text-lg flex items-center modalIcons modalIcons  font-bold text-pink-500'>  <CiImageOn /></span>
            <span className='peer-focus:text-indigo-400 absolute top-0  bottom-0 right-2 text-lg flex items-center modalIcons  font-bold text-indigo-500'><CiFaceSmile /></span>
        </Button>
        {isOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
                <div className="absolute inset-0 bg-black/50" onClick={handlecloseModal} />
                <div className="relative z-10 w-11/12 max-w-xl rounded-xl bg-slate-900 text-white p-4">
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
                            <div className=" overflow-hidden rounded-lg w-fit m-auto">
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
                                <button onClick={() => setShowEmoji((v) => !v)} className="modalIcons hover:bg-indigo-800 hover:text-indigo-300 text-indigo-400 "><CiFaceSmile /></button>
                                {showEmoji && (
                                    <div className="absolute bottom-12 left-0 bg-slate-800 rounded-lg p-2 grid grid-cols-5 gap-1 shadow-lg">
                                        {myEmojis.map((emoji, idx) => (
                                            <button
                                                key={idx}
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

                            <button onClick={handleSendPost} type="button" className="px-3 py-2 bg-indigo-600 hover:bg-indigo-800 rounded-lg transition-all cursor-pointer">
                                Post
                            </button>
                        </div>
                    </div>


                </div>
            </div>
        )}
    </>;
}
