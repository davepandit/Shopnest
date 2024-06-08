import React from 'react'
import { useState } from 'react'
import loginImg from '../../images/pexels-photo-13432012.webp'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { useLocation , useNavigate } from 'react-router-dom'
import { useDispatch , useSelector } from 'react-redux'
import { useLoginMutation } from '../../../slice/user'
import { setCredentials } from '../../../slice/auth'
import { toast } from 'react-toastify'
import {ColorRing} from 'react-loader-spinner'
import Meta from '../../components/meta/Meta'


const LoginPage = () => {
    const [email , setEmail] = useState('')
    const [password , setPassword] = useState('')

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()
    //when we use builder.mutation then we get access to the properties in a different way 
    const [login , {isLoading}] = useLoginMutation()
    const {userInfo} = useSelector((state)=>state.auth) 
    const queryParams = new URLSearchParams(location.search)

    const redirect = queryParams.get('redirect') || '/'

    useEffect(()=>{
      if(userInfo){
        navigate(redirect)
      }
    },[userInfo , redirect , navigate])
    

    const handleSubmit = async(e) => {
        e.preventDefault()
        console.log('email' , email)
        console.log('pass' , password)
        try {
          const res = await login({email , password}).unwrap()
          // in the res we get the data that we send from the login controller
          dispatch(setCredentials({...res}))
          toast.success("Logged In" , {
            autoClose: 2000
          })
          navigate(redirect);
        } catch (error) {
          toast.error('Invalid Email or Password' , {
            autoClose: 2000
          })
        }
    }

    // const clearInputFields = () => {
    //   setEmail('')
    //   setPassword('')
    // }
  return (
    <>
      <div className='sm:flex sm:justify-center lg:justify-between mb-24 max-w-[2000px] mx-auto'>
        <Meta title='login' />
        {/* left section  */}
        <div>
          <img src={loginImg} alt="login page" className='w-[600px] h-full bg-center bg-no-repeat bg-cover hidden lg:block 2xl:w-[900px]'/>
        </div>
          {/* right section  */}
          <div className='sm:w-[600px] h-full flex flex-col pt-24 justify-center '>
          <div className=' text-center text-2xl font-bold'>Login form</div>
          <div className='flex flex-col gap-11 justify-center items-center mt-7 pl-11 pr-11 mb-11'>
            <form onSubmit={handleSubmit}>
              <div className='flex flex-col gap-6'>
                <label htmlFor="email">Email Address</label>
                <input type="text" id='email' name='email' value={email} onChange={(e)=>setEmail(e.target.value)} className='block outline-none  border border-gray-700 rounded-3xl  w-[350px] sm:min-w-[400px] pl-4 pr-4 pt-2 pb-2' placeholder='enter email'/>
              </div>
                
              <div className='flex flex-col gap-6 mt-7'>
                <label htmlFor="password">Password</label>
                <input type="password" id='password' name='password' value={password} onChange={(e)=>setPassword(e.target.value)} className='block outline-none rounded-3xl sm:min-w-[400px] border w-[350px] border-gray-700 pl-4 pr-4 pt-2 pb-2' placeholder='enter password'/>
              </div>
              {isLoading && (<div className=''><ColorRing
              visible={true}
              height="80"
              width="80"
              ariaLabel="color-ring-loading"
              wrapperStyle={{}}
              wrapperClass="color-ring-wrapper"
              colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
              /></div>)}
              <div className='flex gap-6 mt-7 items-center'>
                <button type='submit' className='text-lg font-bold bg-gray-700 text-white hover:opacity-75 pl-4 pr-4 pt-2 pb-2 '
                >Sign In</button>
                <span >New User ? <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}><span className='hover:underline hover:cursor-pointer hover:opacity-75'>create account</span></Link></span>
              </div>
            </form>

          </div>
          </div>
      </div>
      
        
    </>
  )
}

export default LoginPage