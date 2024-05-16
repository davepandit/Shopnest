import React from 'react'
import { IoIosCart } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Header = () => {
    const {cartItems} = useSelector((state)=>state.cart) 
    const [modal , setModal] = useState(false)
    const navigate = useNavigate()

    //handle Modal functionality 
    const handleModal = () =>{
        setModal((prev)=>!prev)
    }

    const redirectToCart = () => {
        navigate('/cart')
        setModal(false)
    }
  return (
    <>
        <div className='flex justify-between sm:pl-11 sm:pr-11 max-w-[2000px] bg-gray-700 text-white mx-auto pt-4 pb-4 items-center pl-7 pr-7 w-full'>
            <Link to='/'><div className='text-3xl font-bold hover:cursor-pointer'>SHOPNEST</div></Link>
            <RxHamburgerMenu className='text-2xl hover:cursor-pointer sm:hidden relative'
            onClick={handleModal}
            />
            {modal && <div className='absolute bg-gray-700 text-white pl-2 pt-4 pr-2 pb-4 flex flex-col right-[5px] top-[70px] w-[200px] h-[250px] gap-6 z-50 justify-center items-center sm:hidden'>
                <span onClick={redirectToCart}>Cart</span>
                <span>SignIn</span>

            </div>}
            
            <div className='sm:flex sm:gap-6 items-center sm:hover:cursor-pointer hidden'>
                <div className='flex gap-3 items-center'>
                    <IoIosCart className='text-2xl'/>
                    <Link to='/cart'><span className='text-lg font-bold'>Cart</span></Link>
                    {cartItems.length > 0 ? (<span className='bg-green-500 text-white pt-1 pb-1 pl-3 pr-3 rounded-full font-bold'>{cartItems.reduce((acc , product)=>{
                        return acc + product.qty
                    },0)}</span>) : null }
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