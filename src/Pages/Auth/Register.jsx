import { Button } from '@heroui/react';
import { zodResolver } from "@hookform/resolvers/zod";
import axios from 'axios';
import { useState } from 'react';
import { useForm } from "react-hook-form";
import { FaArrowRight, FaCheckCircle, FaLock } from 'react-icons/fa';
import { FiUser } from 'react-icons/fi';
import { HiOutlineMail } from 'react-icons/hi';
import { IoMdMale } from 'react-icons/io';
import { LuCalendarDays } from 'react-icons/lu';
import { TbLockCheck } from 'react-icons/tb';
import { Link, useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import * as z from "zod";
// **
import logo from "../../assets/logo2 cut.png";
import InputError from '../../Components/InputError';

const schema = z.object({
  name: z.string().min(3, "name is Too short").max(20, "name is Too long "),
  username: z.string().min(3, "name is Too short").max(20, "name is Too long "),
  email: z.email(),
  dateOfBirth: z.string(),
  gender: z.enum(["male", "female"]),
  password: z.string()
    .min(8, "At least 8 characters")
    .max(20, "At most 20 characters")
    .regex(/[a-z]/, "Must contain a lowercase letter")
    .regex(/[A-Z]/, "Must contain an uppercase letter")
    .regex(/[0-9]/, "Must contain a number")
    .regex(/[!@#$%^&*()]/, "Must contain a special character (!@#$%^&*())"),
  rePassword: z.string()
    .min(8, "At least 8 characters")
    .max(20, "At most 20 characters")
    .regex(/[a-z]/, "Must contain a lowercase letter")
    .regex(/[A-Z]/, "Must contain an uppercase letter")
    .regex(/[0-9]/, "Must contain a number")
    .regex(/[!@#$%^&*()]/, "Must contain a special character (!@#$%^&*())"),
}).refine((data) => data.password === data.rePassword, {
  message: "Password and confirm password must match",
  path: ["rePassword", "password"],
}).required();



export default function Register() {
  const [isLoading, setIsLoading] = useState(false)
  const nav = useNavigate()

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      name: "",
      username: "",
      email: "",
      dateOfBirth: "",
      gender: "male",
      password: "",
      rePassword: "",
    },
    resolver: zodResolver(schema)
    , mode: 'all'
  })
  const notify = (massage) => toast(massage)

  const baseUrl = import.meta.env.VITE_API_BASE_URL


  async function onSubmit(userData) {
    setIsLoading(true)

    try {
      const { data } = await axios(`${baseUrl}/users/signup`, {
        headers: {
          'Content-Type': 'application/json'
        }, method: 'POST',
        data: userData,
      })

      nav("/login")
      setIsLoading(false)
      console.log('success : ', data);

      notify(data?.message)
      return await data


    } catch (error) {
      notify(error?.response?.data?.message)
      console.log('error : ', error);
      setIsLoading(false)
    }

  }





  // console.log('zod errors : ', errors);

  return <div className='py-5 min-h-screen w-full bg-main flex items-center justify-center '>
    <div className="container w-full lg:flex justify-center items-center ">
      <div className="top mb-1 md:mb-3 lg:w-2/5 text-center ">
        <div className='animate-pulse w-fit m-auto '><img className='lg:w-50 w-20 ' src={logo} alt="nexus" /></div>
        <h2 className='animate-bounce md:my-1 lg:text-6xl text-4xl font-bold bg-clip-text text-transparent bg-linear-to-r  from-indigo-500 to-pink-400'>NEXUS</h2>
        <p className='md:my-2 text-white font-semibold lg:text-4xl text-2xl'>Create An Account</p>
        <p className='text-slate-400 lg:text-xl text-medium'>Join the future of social networking</p>
      </div>
      <div className="lg:w-2/5 m-auto bg-slate-950 rounded-xl border  border-slate-700">
        <div className="relative overflow-hidden rounded-xl p-1 py-2 md:p-4 w-full">
          <div className="absolute h-0.5 top-0 left-0 right-0 bg-linear-to-r from-indigo-400 to-pink-400"></div>

          <form onSubmit={handleSubmit(onSubmit)} className='text-slate-300 my-1 md:my-3'>
            {/* full name */}
            <div className='mb-3'>
              <label className='fullName' htmlFor="">Full Name</label>
              <div className='relative w-full'>
                <input {...register("name")} id='fullName' className='peer outline-indigo-800 focus:outline-2 w-full ps-8 input-fields' type="text" placeholder='Enter Your Full Name' />
                <span className='peer-focus:text-indigo-400   absolute top-0 bottom-0 left-2 text-lg flex items-center'><FiUser /></span>
                <InputError message={errors.name?.message} />
              </div>
            </div>
            {/* username */}
            <div className='mb-3'>
              <label className='' htmlFor="userName" >Username (optional)</label>
              <div className='relative w-full'>
                <input {...register("username")} id='userName' className='peer outline-indigo-800 focus:outline-2 w-full ps-8 input-fields' type="text" placeholder='Enter Your User Name' />
                <span className='peer-focus:text-indigo-400   absolute top-0 bottom-0 left-2 text-lg flex items-center'><FiUser /></span>
                <InputError message={errors.username?.message} />

              </div>
            </div>
            {/* email */}
            <div className='mb-3'>
              <label className='email' htmlFor="">Email</label>
              <div className='relative w-full'>
                <input {...register("email")} id='email' className='peer outline-indigo-800 focus:outline-2 w-full ps-8 input-fields' type="text" placeholder='Enter Your Email' />
                <span className='peer-focus:text-indigo-400   absolute top-0 bottom-0 left-2 text-lg flex items-center'><HiOutlineMail /></span>
                <InputError message={errors.email?.message} />
              </div>
            </div>
            {/* password */}
            <div className='mb-3'>
              <label className='' htmlFor="password">Password</label>
              <div className='relative w-full'>
                <input {...register("password")} id='password' className='peer outline-indigo-800 focus:outline-2 w-full ps-8 input-fields' type="password" autoComplete="new-password" placeholder='Enter Your Password' />
                <span className='peer-focus:text-indigo-400 absolute top-0 bottom-0 left-2 text-lg flex items-center'><FaLock /></span>
                <InputError message={errors.password?.message} />
              </div>
            </div>
            {/* rePassword */}
            <div className='mb-3'>
              <label className='' htmlFor="rePassword">Confirm Password</label>
              <div className='relative w-full'>
                <input {...register("rePassword")} id='rePassword' className='peer outline-indigo-800 focus:outline-2 w-full ps-8 input-fields' type="password" autoComplete="new-password" placeholder='Confirm Your Password' />
                <span className='peer-focus:text-indigo-400   absolute top-0 bottom-0 left-2 text-lg flex items-center'><TbLockCheck /></span>
                <InputError message={errors.rePassword?.message} />
              </div>
            </div>
            {/* dateOfBirth */}
            <div className='mb-3'>
              <label className='' htmlFor="birthday">Date Of Birth</label>
              <div className='relative w-full'>
                <input {...register("dateOfBirth")} onClick={e => { e.target.showPicker() }} id='dateOfBirth' className=' peer outline-indigo-800 focus:outline-2 w-full! ps-8 input-fields' type="date" />
                <span className='peer-focus:text-indigo-400  absolute top-0 bottom-0 left-2 text-lg flex items-center'><LuCalendarDays /></span>
                <InputError message={errors.dateOfBirth?.message} />
              </div>
            </div>
            {/* gender */}
            <div className='mb-3'>
              <label className='' htmlFor="male">Gender:</label>
              <div className='flex gap-1 items-center'>
                <input {...register("gender")} className='' id='male' name='gender' value={"male"} type="radio" />
                <label className='flex items-center me-3' htmlFor="male"><span className='text-blue-400 me-1 '><IoMdMale /></span>Male</label>
                <input {...register("gender")} className='' id='female' name='gender' value={"female"} type="radio" />
                <label className='flex items-center' htmlFor="female"><span className='text-pink-400 me-1 '><IoMdMale /></span>Female</label>
                <InputError message={errors.gender?.message} />
              </div>
            </div>
            <p className='text-sm flex gap-1 items-center'>
              <input id="registerTerms" type="checkbox" className='peer hidden' />
              <label className='peer-checked:text-indigo-600  text-slate-700 text-lg' htmlFor='registerTerms'><FaCheckCircle /></label>
              I agree to the
              <Link className='text-indigo-600 hover:text-indigo-300' to={"/register"}> Terms of Service</Link>
              and
              <Link className='text-indigo-600 hover:text-indigo-300' to={"/register"}>Privacy Policy</Link>
            </p>
            <Button isLoading={isLoading} type='submit' className='shadow-indigo-800 shadow-[0px_2px_10px_0.5px] rounded-lg w-full py-2 my-3 bg-linear-to-r from-indigo-600 to-pink-600 flex items-center justify-center cursor-pointer group'>
              <span>Create Account</span>
              <span><FaArrowRight className='translate-y-0.5 ms-1 group-hover:translate-x-1 transition text-sm' /></span>
            </Button>
          </form>
          <div className='pt-1 md:py-2 border-t border-slate-700 text-center'>

            <p className="text-slate-500">Already have an account? <Link className='text-indigo-600 hover:text-indigo-300' to={"/login"}> Sign in</Link></p>

          </div>
        </div>
      </div>
    </div>

  </div>

}
