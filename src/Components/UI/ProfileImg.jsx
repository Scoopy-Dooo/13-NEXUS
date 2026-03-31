import { useContext } from 'react';
import profileLogo from "../../assets/sco logo.jpg";
import { UserContext } from './../../Contexts/UserContext';
import { Link } from 'react-router';

export default function ProfileImg({ size, user , notLink}) {

    const { userData } = useContext(UserContext)

    const photo = user?.photo ?? userData?.photo;
    const cacheBuster = userData?.photoUpdatedAt ?? '';
    const src = photo ? `${photo}?t=${cacheBuster}` : profileLogo;

    return <Link to={notLink ? "" : `/profile/${user?._id}`} className={`${size ? size : 'size-11'} size-fit overflow-hidden`}>
        <div className={`imagewrapper rounded-full  ${size ? size : 'size-11'} border-3 border-slate-500 group-hover:border-indigo-600 transition-all`}>
            <img src={src} className='object-cover size-full rounded-full' alt="profile picture" />
        </div>
    </Link>
}