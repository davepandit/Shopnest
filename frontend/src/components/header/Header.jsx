import React from 'react'
import { IoIosCart } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link } from 'react-router-dom';


const Header = () => {
  return (
    <>
        <div className='flex justify-between sm:pl-11 sm:pr-11 max-w-[2000px] bg-gray-700 text-white mx-auto pt-4 pb-4 items-center pl-7 pr-7'>
            <Link to='/'><div className='text-3xl font-bold hover:cursor-pointer'>SHOPNEST</div></Link>
            <RxHamburgerMenu className='text-2xl hover:cursor-pointer sm:hidden'/>
            <div className='sm:flex sm:gap-6 items-center sm:hover:cursor-pointer hidden'>
                <div className='flex gap-3 items-center'>
                    <IoIosCart className='text-2xl'/>
                    <Link to='/cart'><span className='text-lg font-bold'>Cart</span></Link>
                </div>
                <div className='flex gap-3 items-center'>
                    <FaUser className='text-2xl '/>
                    <Link to='/login'><span className='text-lg font-bold'>SignIn</span></Link>
                </div>
            </div>
        </div>
    </>
  )
}

export default Header