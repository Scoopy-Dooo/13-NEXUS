import { QueryClient, QueryClientProvider, } from '@tanstack/react-query';
import { createBrowserRouter, RouterProvider } from 'react-router';
import { ToastContainer } from 'react-toastify';
import Layout from './Components/Layouts/Layout';
import Guard from './Guard';
import LogIn from './Pages/Auth/LogIn';
import Register from './Pages/Auth/Register';
import Massages from './Pages/Chatting/Massages';
import Home from './Pages/Home/Home';
import Notifications from './Pages/Notifications/Notifications';
import PostDetails from './Pages/Post/PostDetails';
import Profile from './Pages/Profile/Profile';
import Settings from './Pages/Settings/Settings';



export default function App() {
  const router = createBrowserRouter([
    {
      path: "/", element: <Layout />, children: [
        { path: "/", element: <Guard><Home /></Guard> },
        { path: "/home", element: <Guard><Home /></Guard> },
        { path: "/profile/:userId", element: <Guard><Profile /></Guard> },
        { path: "/post/:id", element: <Guard><PostDetails /></Guard> },
        { path: "/settings", element: <Guard><Settings /></Guard> },
        { path: "/massages", element: <Guard><Massages /></Guard> },
        { path: "/notifications", element: <Guard><Notifications /></Guard> },
        { path: "login", element: <Guard><LogIn /></Guard> },
        { path: "register", element: <Guard><Register /></Guard> }]
    }])

  const queryClient = new QueryClient()

  return <QueryClientProvider client={queryClient}>
    <div className='relative z-100'><ToastContainer autoClose={2500} /></div>
    <div className='min-h-screen bg-slate-950 text-slate-500'>
      <RouterProvider router={router} />
    </div>
  </QueryClientProvider>
}