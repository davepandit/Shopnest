import React from 'react'
import { useDispatch , useSelector } from 'react-redux'
import { useProfileMutation } from '../../../slice/user'
import { useState , useEffect } from 'react'
import {ColorRing} from 'react-loader-spinner'
import { toast } from 'react-toastify'
import { setCredentials } from '../../../slice/auth'
import { useGetOrdersQuery } from '../../../slice/order'
import { FaTimes } from "react-icons/fa";
import { useNavigate } from 'react-router-dom'

const UpdateProfile = () => {
  const [name , setName] = useState()
  const [email , setEmail] = useState()
  const [password , setPassword] = useState()
  const [confirmPass , setConfirmPass] = useState()
  const navigate = useNavigate()

  const {userInfo} = useSelector((state)=>state.auth)
  const dispatch = useDispatch()
  const [profile , {isLoading} ] = useProfileMutation()
  const {data:orders , isLoading:ordersLoading , error} = useGetOrdersQuery()

  useEffect(()=>{
    setName(userInfo.name)
    setEmail(userInfo.email)
  },[userInfo])

  const handleSubmit = async(e) => {
    e.preventDefault()
    if(password !== confirmPass){
      toast.error("Pass doesnot match" , {
        autoClose: 2000
      })

    }else{
      try {
        const response = await profile({
          name , 
          email , 
          password
        }).unwrap()

        dispatch(setCredentials(response))
        toast.success("Profile updated successfully",{
          autoClose: 2000
        })
      } catch (error) {
        toast.error(`${error.message}`,{
          autoClose: 2000
        })
      }
    }
  }
  return (
    <>
      <div className='flex flex-col  pl-32 pr-32 md:p-0 lg:justify-normal lg:items-start justify-center items-center xl:flex-row xl:justify-around gap-6 mt-11 mb-28'>

        {/* left section  */}
        <div className='flex flex-col gap-5'>
          <span className='text-gray-700 font-bold text-3xl '>
            User Profile
          </span>
          <form onSubmit={handleSubmit}>
            <div className='flex flex-col gap-5'>
              <div className='flex flex-col gap-1'>
                <label htmlFor="name">Name</label>
                  <input type="text" name='name' id='name' className='block outline-none  border border-gray-700 rounded-3xl  w-[350px] sm:min-w-[400px] pl-4 pr-4 pt-2 pb-2'
                  value={name}
                  onChange={(e)=>setName(e.target.value)}
                  />
              </div>
              <div className='flex flex-col gap-1'>
                <label htmlFor="email">Email Adress</label>
                  <input type="email" name='email' id='email' className='block outline-none  border border-gray-700 rounded-3xl  w-[350px] sm:min-w-[400px] pl-4 pr-4 pt-2 pb-2'
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}
                  />
              </div>
              <div className='flex flex-col gap-1'>
                <label htmlFor="password">Password</label>
                  <input type="password" name='password' id='password' className='block outline-none  border border-gray-700 rounded-3xl  w-[350px] sm:min-w-[400px] pl-4 pr-4 pt-2 pb-2'
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)}
                  />
              </div>
              <div className='flex flex-col gap-1'>
                <label htmlFor="password">Confirm Password</label>
                  <input type="password" name='password' id='password' className='block outline-none  border border-gray-700 rounded-3xl  w-[350px] sm:min-w-[400px] pl-4 pr-4 pt-2 pb-2'
                  value={confirmPass}
                  onChange={(e)=>setConfirmPass(e.target.value)}
                  />
              </div>
              <div className='flex justify-center'>
                <button className='text-lg font-bold bg-gray-700 text-white hover:opacity-75 pl-4 pr-4 pt-2 pb-2 w-[200px] h-auto' type='submit'>Update</button>
              </div>
              {isLoading && <div className='flex justify-center'><ColorRing
              visible={true}
              height="80"
              width="80"
              ariaLabel="color-ring-loading"
              wrapperStyle={{}}
              wrapperClass="color-ring-wrapper"
              colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
              /></div>}
              
            </div>
          </form>
        </div>

        {/* Right section  */}
        
        {ordersLoading ? (<div className='flex justify-center'><ColorRing
              visible={true}
              height="80"
              width="80"
              ariaLabel="color-ring-loading"
              wrapperStyle={{}}
              wrapperClass="color-ring-wrapper"
              colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
              /></div>) : error ? (<div>{error?.data?.message || error.error}</div>) : (
                <div className='w-[350px] overflow-x-scroll md:w-auto md:overflow-auto'>
                  <div className='text-3xl font-bold text-gray-700 text-center'>
                      My Orders
                  </div>
                  <table className='divide-y divide-gray-300 mt-9'>
                    <thead className='bg-gray-200'>
                      <tr>
                      <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>ID</th>
                      <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Date</th>
                      <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Total</th>
                      <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Paid</th>
                      <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Delivered</th>
                      <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'></th>
                      </tr>
                    </thead>
                    <tbody className='bg-white divide-y divide-gray-200'>
                      {orders.map((order)=>{
                        return (
                          <tr>
                            <td className='px-2 py-4 whitespace-nowrap'>{order._id}</td>
                            <td className='px-2 py-4 whitespace-nowrap'>{order.createdAt.substring(0, 10)}</td>
                            <td className='px-2 py-4 whitespace-nowrap'>Rs.{order.totalPrice}</td>
                            <td className='px-2 py-4 whitespace-nowrap'>
                            {order.isPaid ? (
                              order.paidAt.substring(0, 10)
                              ) : (
                              <FaTimes style={{ color: 'red' }} />
                            )}
                            </td>
                            <td className='px-2 py-4 whitespace-nowrap flex justify-center items-center'>
                            {order.isDelivered ? (
                              order.deliveredAt.substring(0, 10)
                              ) : (
                              <FaTimes style={{ color: 'red' }} />
                            )}
                            </td>
                            <td>
                              <button onClick={()=>(navigate(`/order/${order._id}`))} className='bg-gray-400 pl-3 pr-3 pt-1 pb-1 hover:opacity-55 duration-300 ease-in-out'>
                                Details
                              </button>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
              </div>
            )}
      </div>
    </>
  )
}

export default UpdateProfile