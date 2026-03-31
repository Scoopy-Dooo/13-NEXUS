import { Button, Tooltip } from '@heroui/react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from '@tanstack/react-query';
import { useContext, useState } from 'react';
import { useForm } from "react-hook-form";
import { FaArrowRight, FaEye, FaLock, FaRegEyeSlash } from 'react-icons/fa';
import { HiOutlineMail } from 'react-icons/hi';
import { Link, useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import * as z from "zod";
import logo from "../../assets/logo2 cut.png";
import InputError from '../../Components/InputError';
import { AuthContext } from '../../Contexts/AuthContext';
import { UserContext } from '../../Contexts/UserContext';
import { loginApi } from '../../Services/LoginApi';

const schema = z.object({
  email: z.string(),
  password: z.string(),
}).required();

export default function LogIn() {
  const [isShowPass, setIsShowPass] = useState(false)
  const { setToken } = useContext(AuthContext)
  const { setUserData } = useContext(UserContext)
  const nav = useNavigate()

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: { email: "", password: "" },
    resolver: zodResolver(schema),
    mode: 'all',
  })




  const { mutate: login, isPending } = useMutation({
    mutationFn: (userData) => loginApi(userData),
    mutationKey: ['login'],
    onSuccess: (data) => {
      const token = data?.token ?? data?.data?.token ?? null
      if (token) {
        localStorage.setItem('token', token)
        localStorage.setItem('userData', JSON.stringify(data?.data?.user))
        setToken(token)
        setUserData(data?.data?.user)
      }
      toast.success("Logged in successfully!" , {autoClose: 1500}) 
      nav("/home")
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Login failed")
    }
  })




  function onSubmit(userData) {
    login(userData)
  }

  function handlePassView() {
    setIsShowPass(prev => !prev)
  }

  return <div className='py-5 min-h-screen w-full bg-main flex items-center justify-center '>
    <div className="container w-full flex-col justify-center items-center gap-2 ">
      <div className="top mb-3 lg:w-1/2 m-auto text-center ">
        <div className='animate-pulse w-fit m-auto '><img className=' w-20 ' src={logo} alt="nexus" /></div>
        <h2 className='animate-bounce my-1  text-4xl font-bold bg-clip-text text-transparent bg-linear-to-r  from-indigo-500 to-pink-400'>NEXUS</h2>
        <p className='mt-2 text-white font-semibold  text-2xl'>Welcome</p>
        <p className='text-slate-400  text-medium'>Sign in to continue to your Account</p>
      </div>
      <div className="lg:w-1/2 m-auto  bg-slate-950 rounded-xl border  border-slate-700">
        <div className="relative overflow-hidden rounded-xl p-4 py-10 w-full">
          <div className="absolute h-0.5 top-0 left-0 right-0 bg-linear-to-r from-indigo-400 to-pink-400"></div>

          <form onSubmit={handleSubmit(onSubmit)} className='text-slate-300 my-3'>

            {/* value */}
            <div className='mb-3 '>
              <label className='email' htmlFor="email">Email or Username</label>
              <div className='relative w-full'>
                <input {...register("email")} id='email' className='peer bg-transparent outline-indigo-800 focus:outline-2 w-full ps-8 input-fields' type="text" autoComplete="email" placeholder='Enter Your Email or UserName' />
                <span className='peer-focus:text-indigo-400   absolute top-0 bottom-0 left-2 text-lg flex items-center'><HiOutlineMail /></span>
                <InputError message={errors.email?.message} />
              </div>
            </div>
            {/* password */}
            <div className='mb-3 md:mb-10'>
              <label className='' htmlFor="password">Password</label>
              <div className='relative w-full'>
                <input {...register("password")} id='password' className='peer outline-indigo-800 focus:outline-2 w-full ps-8 input-fields' type={isShowPass ? "text" : "password"} autoComplete="current-password" placeholder='Enter Your Password' />
                <span className='peer-focus:text-indigo-400 absolute top-0 bottom-0 left-2 text-lg flex items-center'><FaLock /></span>
                <Tooltip
                  content={isShowPass ? "Hide password" : "Show password"}
                  placement="left"
                  classNames={{
                    base: "bg-slate-800 border border-slate-700",
                    content: `text-xs font-medium ${isShowPass ? "text-pink-400" : "text-indigo-400"}`
                  }}
                >
                  <button type='button' onClick={handlePassView} className='peer-focus:text-indigo-400 absolute top-0 bottom-0 right-2 text-lg flex items-center cursor-pointer'>
                    {isShowPass ? <FaEye className='text-pink-700' /> : <FaRegEyeSlash className='text-indigo-700' />}
                  </button>
                </Tooltip>
                <InputError message={errors.password?.message} />
              </div>
            </div>


            <Button isLoading={isPending} type='submit' className='shadow-indigo-800 shadow-[0px_2px_10px_0.5px] rounded-lg w-full py-2 my-3 bg-linear-to-r from-indigo-600 to-pink-600 flex items-center justify-center cursor-pointer group'>
              <span>Login</span>
              <span><FaArrowRight className='translate-y-0.5 ms-1 group-hover:translate-x-1 transition text-sm' /></span>
            </Button>

          </form>
          <div className='py-2 border-t border-slate-700 text-center'>

            <p className="text-slate-500">Don't have an account?<Link className='text-indigo-600 hover:text-indigo-300' to={"/register"}> Sign up</Link></p>

          </div>
        </div>
      </div>
    </div>

  </div>

}
