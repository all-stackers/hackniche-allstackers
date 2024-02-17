import React from 'react'
import { useRouter } from 'next/router'
import Navlink from './Navlink'

const navbar = () => {
    const router = useRouter()

    return (
        <div className='w-full h-[60px] min-h-[60px] border-b border-[#ececfb] shadow-sm flex flex-row items-center px-[30px] cursor-pointer'>
            <div className='flex flex-row gap-x-[15px]' onClick={() => {router.push('/')}}>
                <img src='/logo.svg' alt='logo' className='w-[30px] h-[30px]'/>
                <div className='text-[17px] font-[500]'>App Name</div>
            </div>

            <div className='flex flex-row gap-x-[20px] ml-auto'>
                {/* <Navlink name='Home' link='/' /> */}
            </div>
        </div>
    )
}

export default navbar
