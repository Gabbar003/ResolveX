import React from 'react'
import pnt  from "./logo1.png"
import squareicon  from "./collage.png"
import issue from "./issue.svg"
import Image from 'next/image'
import mail from "./mmail.svg"
import question from "./question.png"
import Link from 'next/link'
import { useRouter } from 'next/router'
import gear from "./gear.png"


const Navbar = () => {
    const router = useRouter()
    
  return (
   <div className='flex flex-col justify-between bg-black w-[13%] h-full  py-7 px-4'>
    <div className='pt-1 flex flex-row  justify-center'><Image  src={pnt} alt="logo" width={120} /></div>
    <div className='text-white mb-52 space-y-2'>

        <div onClick={()=> router.push("/")} className='p-3 space-x-4 flex flex-row text-sm items-center bg-[#1F1F1F] rounded-lg '><Image  src={squareicon} alt="logo" width={25} /><span className='text-left'>Dashboard</span></div>
        <div onClick={()=> router.push("/issues")} className='p-3 space-x-4 flex flex-row text-sm items-center cursor-pointer '><Image  src={issue} alt="logo" width={25} /><span className="text-end">Issues</span></div>
        <div className='p-3 space-x-4 flex flex-row text-sm items-center disabled'><Image  src={mail} alt="logo" width={25} /><span>Invite Access</span></div>

    </div>
    <div className='text-white'>

    <div className='p-3 space-x-4 flex flex-row text-sm items-center '><Image  src={gear} alt="logo" width={25} /><span>Settings</span></div>
    <div className='p-3 space-x-4 flex flex-row text-sm items-center '><Image  src={question} alt="logo" width={25} /><span>Support me</span></div>
        <div className='w-full mt-3 rounded-lg flex flex-row items-center justify-center text-center'><button className=' bg-red-700 w-[90%] rounded-lg py-2'>Logout</button></div>

    </div>


   


   </div>
  )
}

export default Navbar