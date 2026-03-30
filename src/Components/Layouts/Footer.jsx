import React from 'react'
import { IoMdHeartEmpty } from 'react-icons/io'

export default function Footer() {
  return <div className='fixed z-100 bottom-0 w-full  py-2 bg-slate-900 text-slate-500'>
    <p className='flex gap-1 items-center justify-center'>
      © 2026 NEXUS
      ,made with
      <span className="text-pink-600 pt-1"><IoMdHeartEmpty /></span> by
      <span className='text-indigo-600'><a target='_blank' href="https://github.com/Scoopy-Dooo/">Mohamed Saad</a></span>
    </p>
  </div>

}
