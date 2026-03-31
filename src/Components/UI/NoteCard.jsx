import { Card, CardBody, CardHeader } from '@heroui/react';
import { Link } from 'react-router';
import timeAgo from './../../Services/DateFormatter';
import ProfileImg from './ProfileImg';

const NOTIFICATION_CONFIG = {
    comment_post: { message: 'commented on your post', emoji: '💬' },
    like_post: { message: 'liked your post', emoji: '❤️' },
    follow_user: { message: 'started following you', emoji: '👤' },
};

export default function NoteCard({ note }) {
    if (!note) return null;

    const { type, entity, entityType, actor, createdAt, isRead } = note;
    const config = NOTIFICATION_CONFIG[type] || { message: 'interacted with you', emoji: '✨' };

    // Calculate preview text
    const preview = type === 'comment_post' 
        ? entity?.content || entity?.body 
        : type === 'like_post' 
        ? entity?.body 
        : null;

    // Calculate navigation link
    const navigationLink = type === 'follow_user'
        ? `/profile/${entity?._id}`
        : type === 'comment_post'
        ? entityType === 'comment' ? `/post/${entity?.post}` : `/post/${entity?._id}`
        : type === 'like_post'
        ? `/post/${entity?._id}`
        : null;

    const cardElement = (
        <Card className="group animate-myAnimate relative bg-linear-to-r from-slate-800 to-slate-900 border border-slate-600 hover:border-slate-500 hover:shadow-lg transition-all duration-200 cursor-pointer overflow-hidden">
            {!isRead && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500 group-hover:bg-indigo-500 transition-colors" />
            )}

            <CardHeader className="flex justify-between items-start pb-3 pt-4 px-4">
                <div className="flex gap-3 flex-1">
                    <ProfileImg user={actor} />
                    <div className="flex flex-col gap-1 flex-1">
                        <div className="flex items-center gap-2">
                            <Link
                                to={`/profile/${actor?._id}`}
                                className="font-bold text-sm text-white group-hover:text-indigo-400 transition-colors truncate"
                            >
                                {actor?.name}
                            </Link>
                            <span className="text-lg">{config.emoji}</span>
                        </div>
                        <p className="text-xs text-slate-400">{config.message}</p>
                    </div>
                </div>
                <p className="text-xs text-slate-500 font-medium whitespace-nowrap ml-2">{timeAgo(createdAt)}</p>
            </CardHeader>

            {preview && (
                <CardBody className="py-2 px-4">
                    <div className="bg-slate-700 bg-opacity-40 rounded border-l-2 border-indigo-400 pl-3 py-2">
                        <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed italic">
                            "{preview}"
                        </p>
                    </div>
                </CardBody>
            )}
        </Card>
    );

    return navigationLink ? (
        <Link to={navigationLink} className="no-underline hover:no-underline">
            {cardElement}
        </Link>
    ) : (
        cardElement
    );
}
