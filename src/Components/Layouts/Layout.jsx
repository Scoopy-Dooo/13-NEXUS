import { useContext } from 'react';
import { Outlet, useLocation } from 'react-router';
import Footer from './Footer';
import NavBar from './NavBar';
import { AuthContext } from '../../Contexts/AuthContext';

const pageTitles = {
    '/': 'Home',
    '/home': 'Home',
    '/login': 'Login',
    '/register': 'Register',
    '/notifications': 'Notifications',
    '/massages': 'Messages',
    '/settings': 'Settings',
};

export default function Layout() {
    const { token } = useContext(AuthContext)
    const { pathname } = useLocation()
    const segment = '/' + pathname.split('/')[1];
    const pageTitle = pageTitles[segment]
        ?? (pathname.startsWith('/profile') ? 'Profile'
            : pathname.startsWith('/post') ? 'Post'
                : 'NEXUS');

    return <>
        <title>NEXUS | {pageTitle}</title>
        {token ? <>
            <div className='w-full min-h-screen md:grid md:grid-cols-6 lg:grid-cols-8'>
                <div className='hidden md:block md:col-span-1 lg:col-span-2'><NavBar /></div>
                <div className='col-span-full md:col-span-5 lg:col-span-6 pb-20 md:pb-8'><Outlet /></div>
            </div>
            <NavBar mobile />
            <Footer />
        </> : <>
            <div className=''>
                <div className='w-full  '>
                    <Outlet />
                </div>
                <Footer />
            </div>
        </>}
    </>
}