import React from 'react'
import { IoIosCart } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link } from 'react-router-dom';
import { useSelector , useDispatch } from 'react-redux';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RiArrowDropDownLine } from "react-icons/ri";
import { useLogoutMutation } from '../../../slice/user';
import { removeCredentials } from '../../../slice/auth';
import { toast } from 'react-toastify';
import SearchBar from '../searchBar/SearchBar';
import { FaSearchengin } from "react-icons/fa6";
import { useSearchParams } from 'react-router-dom';


const Header = () => {
    const {cartItems} = useSelector((state)=>state.cart) 
    const [searchParams , setSearchParams] = useSearchParams()
    const searchFromURL = searchParams.get('search') || ''
    const [search , setSearch] = useState(searchFromURL)
    const [modal , setModal] = useState(false)
    const [profileModal , setProfileModal] = useState(false)
    const [searchBar , setSearchBar] = useState(false)
    const {userInfo} = useSelector((state)=>state.auth) 
    const [logout , {isLoading}] = useLogoutMutation()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    //handle Modal functionality 
    const handleModal = () =>{
        setModal((prev)=>!prev)
    }

    // for profile 
    const handleProfileModal = () => {
        setProfileModal((prev)=>!prev)
    }
    const handleLogout = async() => {
        try {
            const res = await logout().unwrap()
            console.log(res)
            dispatch(removeCredentials())
            toast.success(res.mssg)
            navigate('/login')
            setProfileModal(false)
        } catch (error) {
            toast.error('Something went wrong')
        }
    }

    const redirectToCart = () => {
        navigate('/cart')
        setModal(false)
    }

    const redirectToSignIn = () => {
        navigate('/signin')
        setModal(false)
    }
    

    const handleRedirectToUpdateProfile = () => {
        navigate('/updateprofile')
        setProfileModal(false)
        setModal(false)

    }
    const handleRedirectToOrderList = () => {
        navigate('/admin/orderlist')
        setProfileModal(false)
        setModal(false)
    }

    const handleRedirectToProductsPage = () => {
        navigate('/admin/productlist')
        setProfileModal(false)
        setModal(false)
    }

    const handleRedirectToUsersPage = () => {
       navigate('/admin/userlist')
       setModal(false)
       setProfileModal(false)
    } 
    const handleSubmit = (e) => {
        e.preventDefault()
        if(search.trim()){
            navigate(`/?pageNumber=1&&search=${search}`)
            setSearch('')
            setSearchBar((prev)=>(!prev))
        }else{
            navigate('/')
        }
    }
  return (
    <>
        <div className='flex justify-between sm:pl-11 sm:pr-11 max-w-[2000px] bg-gray-700 text-white mx-auto pt-4 pb-4 items-center pl-7 pr-7 w-full'>
            <Link to='/'><div className='text-3xl font-bold hover:cursor-pointer'>SHOPNEST</div></Link>
            <FaSearchengin className='text-2xl hover:cursor-pointer sm:hidden relative' onClick={()=>(setSearchBar((prev)=>(!prev)))}/>
            {searchBar && <form onSubmit={handleSubmit}><div className='absolute z-50 top-[65px] bg-gray-300 flex justify-between left-0 right-0 mx-auto w-full pl-7 pr-7 pt-4 pb-4'>
                <input type="text" className='text-black pl-3 pr-3 pt-1 pb-1 outline-none border border-gray-700' placeholder='search' value={search} onChange={(e)=>(setSearch(e.target.value))}/>
                <button className='bg-gray-500 text-white pl-3 pr-3 pt-1 pb-1 font-bold' type='submit'>Search</button>
                </div></form>}
            <RxHamburgerMenu className='text-2xl hover:cursor-pointer sm:hidden relative'
            onClick={handleModal}
            />
            {modal && <div className='absolute bg-gray-700 text-white pl-2 pt-4 pr-2 pb-4 flex flex-col right-[5px] top-[70px] w-[200px] h-[250px] gap-6 z-50 justify-center items-center sm:hidden'>
                <span onClick={redirectToCart}>Cart</span>

                {userInfo ? (<span onClick={handleRedirectToUpdateProfile}>{userInfo.name}</span>) : (<span onClick={redirectToSignIn}>SignIn</span>)}

                {userInfo.isAdmin && 
                    <div className='flex flex-col gap-6 justify-center items-center'>
                        <span onClick={handleRedirectToOrderList}>OrderList</span>
                        <span onClick={handleRedirectToProductsPage}>Products</span>
                        <span onClick={handleRedirectToUsersPage}>Users</span>
                    </div>
                }  
                

            </div>}
            
            <div className='sm:flex sm:gap-6 items-center sm:hover:cursor-pointer hidden'>
                <div className='flex gap-3 items-center'>
                    <SearchBar />
                    <IoIosCart className='text-2xl'/>
                    <Link to='/cart'><span className='text-lg font-bold'>Cart</span></Link>
                    {cartItems.length > 0 ? (<span className='bg-green-500 text-white pt-1 pb-1 pl-3 pr-3 rounded-full font-bold'>{cartItems.reduce((acc , product)=>{
                        return acc + product.qty
                    },0)}</span>) : null }
                </div>
                <div className='flex gap-3 items-center relative'>
                    {userInfo ? (<RiArrowDropDownLine className='text-2xl '
                    onClick={handleProfileModal}
                    />) : (<FaUser className='text-2xl '/>)}
                    {profileModal && (
                        <div className='absolute bg-gray-700 text-white pl-2 pt-4 pr-2 pb-4 flex flex-col right-[0px] top-[50px] w-[200px] h-[250px] gap-6 z-50 justify-center items-center'>
                            <span onClick={handleRedirectToUpdateProfile}>Profile</span>
                            <span onClick={handleLogout}>Logout</span>
                            {userInfo.isAdmin && 
                            <div className='flex flex-col gap-6 justify-center items-center'>
                                <span onClick={handleRedirectToOrderList}>OrderList</span>
                                <span onClick={handleRedirectToProductsPage}>Products</span>
                                <span onClick={handleRedirectToUsersPage}>Users</span>
                            </div>
                            }                            
                        </div>
                    )}
                    {userInfo ? (<span>{userInfo.name}</span>) : (<Link to='/login'><span className='text-lg font-bold'>SignIn</span></Link>)}
                    
                </div>
            </div>
        </div>
    </>
  )
}

export default Header