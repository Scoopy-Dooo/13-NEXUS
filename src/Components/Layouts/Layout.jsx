import { Button } from '@heroui/react';
import { useContext } from 'react';
import { FaArrowUp } from 'react-icons/fa';
import { Outlet } from 'react-router';
import { AuthContext } from '../../Contexts/AuthContext';
import Footer from './Footer';
import NavBar from './NavBar';


export default function Layout() {
    const { token } = useContext(AuthContext)
    function goUp() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }






    

    return <>
        {token ? <>
            <div className='w-full min-h-screen md:grid md:grid-cols-6 lg:grid-cols-8'>
                <div className='hidden md:block md:col-span-1 lg:col-span-2'><NavBar /></div>
                <div className='col-span-full md:col-span-5 lg:col-span-6 pb-20 md:pb-8'><Outlet /></div>
            </div>
            <NavBar mobile />
            <Footer />
            <Button
                className='fixed bottom-24 sm:bottom-12 right-4 animate-[blink_3s_ease-in-out_infinite]  z-50 bg-indigo-600 text-white max-sm:size-8 max-sm:min-w-0  rounded-full shadow-lg hover:bg-indigo-500 active:scale-95 transition-all '
                onPress={goUp}>
                <span className='text-sm'><FaArrowUp /></span>
            </Button>
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