import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router';
import { ToastContainer } from 'react-toastify';
import Layout from './Components/Layouts/Layout';
import Guard from './Guard';
import NotFound from './Pages/NotFound/NotFound';
import EditProfile from './Pages/Profile/EditProfile';
import { Spinner } from '@heroui/react';


const LogIn = lazy(() => import('./Pages/Auth/LogIn'));
const Register = lazy(() => import('./Pages/Auth/Register'));
const Massages = lazy(() => import('./Pages/Chatting/Massages'));
const Home = lazy(() => import('./Pages/Home/Home'));
const Notifications = lazy(() => import('./Pages/Notifications/Notifications'));
const PostDetails = lazy(() => import('./Pages/Post/PostDetails'));
const Profile = lazy(() => import('./Pages/Profile/Profile'));
const Settings = lazy(() => import('./Pages/Settings/Settings'));


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Guard><Home /></Guard> },
      { path: "/home", element: <Guard><Home /></Guard> },
      {
        path: "/profile/:userId", element: <Guard><Profile /></Guard>, children: [
          { path: "/profile/:userId/editprofile", element: <Guard><EditProfile /></Guard> },
        ]
      },
      { path: "/post/:id", element: <Guard><PostDetails /></Guard> },
      { path: "/settings", element: <Guard><Settings /></Guard> },
      { path: "/massages", element: <Guard><Massages /></Guard> },
      { path: "/notifications", element: <Guard><Notifications /></Guard> },
      { path: "login", element: <Guard authOnly={false}><LogIn /></Guard> },
      { path: "register", element: <Guard authOnly={false}><Register /></Guard> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

export default function App() {
  return <>
    <div className='absolute w-fit z-100'><ToastContainer autoClose={2500} /></div>
    <div className='min-h-screen  bg-slate-950 text-slate-500'>
      <Suspense fallback={<div className="min-h-screen bg-slate-950 w-full flex items-center justify-center">      <Spinner color="secondary" label="please wait" labelColor="secondary" />
      </div>}>
        <RouterProvider router={router} />
      </Suspense>
    </div>
  </>
}
