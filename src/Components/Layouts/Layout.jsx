import { useContext, useEffect } from 'react';
import { Outlet } from 'react-router';
import Footer from './Footer';
import NavBar from './NavBar';
import { AuthContext } from '../../Contexts/AuthContext';
import { ToastContainer } from 'react-toastify';

export default function Layout() {
    const { token } = useContext(AuthContext)


    useEffect(() => {
        // console.log('token in layout : ', token);
    }, [token])
    // || localStorage.getItem('token')

    return <>
        <div className='w-full grid grid-cols-6'>
            <NavBar />
            <div className='col-span-5 pb-8'><Outlet /></div>
        </div>
        <Footer />
    </>
    // return <>
    //     <ToastContainer />
    //     {!token ? <>
    //         <div className='w-full grid grid-cols-6'>
    //             <NavBar />
    //             <div className='col-span-5'><Outlet /></div>
    //         </div>
    //         <Footer />
    //     </> : <>
    //         <div className=''>
    //             <div className='w-full '>
    //                 <Outlet />
    //             </div>
    //             <Footer />
    //         </div>
    //     </>}
    // </>
}