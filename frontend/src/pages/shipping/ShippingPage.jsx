import React from 'react'
import { useSelector , useDispatch } from 'react-redux'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import shippingImg from '../../images/shipping.webp'
import { saveShippingAddress } from '../../../slice/cart'
import CheckoutStatus from '../../components/checkoutStatus/CheckoutStatus'
const ShippingPage = () => {
    const cart = useSelector((state)=>state.cart)
    const {shippingAddress} = cart

    const [address , setAddress] = useState(shippingAddress?.address || '')
    const [postalCode , setPostalCode] = useState(shippingAddress?.postalCode || '')
    const [city , setCity] = useState(shippingAddress?.city || '')
    const [country , setCountry] = useState(shippingAddress?.country || '')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSubmit = (e) => {
      e.preventDefault()
      dispatch(saveShippingAddress({address , city , postalCode , country}))
      navigate('/payment')
    }
  return (
    <>
      
      <div className='sm:flex sm:justify-center lg:justify-between mb-24 max-w-[2000px] mx-auto'>
        
        {/* left section  */}
        <div>
          <img src={shippingImg} alt="login page" className='w-[600px] h-full bg-center bg-no-repeat bg-cover hidden lg:block 2xl:w-[900px]'/>
        </div>
          {/* right section  */}
          <div className='sm:w-[600px] h-full flex flex-col pt-11 pl-7 pr-7 sm:pl-0 sm:pr-0 sm:pt-24 justify-center '>
          <div className='flex justify-center gap-6 mb-11'><CheckoutStatus step1 step2 /> </div>
          <div className=' text-center text-2xl font-bold'>Shipping Details form</div>
          <div className='flex flex-col gap-11 justify-center items-center mt-7 pl-11 pr-11 mb-11'>
            <form onSubmit={handleSubmit}>
              <div className='flex flex-col gap-6'>
                <label htmlFor="address">Address</label>
                <input type="text" id='address' name='address' value={address} onChange={(e)=>setAddress(e.target.value)} className='block outline-none  border border-gray-700 rounded-3xl  w-[350px] sm:min-w-[400px] pl-4 pr-4 pt-2 pb-2' placeholder='enter address'/>
              </div>
                
              <div className='flex flex-col gap-6 mt-7'>
                <label htmlFor="city ">City</label>
                <input type="text" id='city' name='city' value={city} onChange={(e)=>setCity(e.target.value)} className='block outline-none rounded-3xl sm:min-w-[400px] border w-[350px] border-gray-700 pl-4 pr-4 pt-2 pb-2'
                placeholder='enter city'/>
              </div>
              <div className='flex flex-col gap-6 mt-7'>
                <label htmlFor="postalCode">Postal Code</label>
                <input type="text" id='postalCode' name='postalCode' value={postalCode} onChange={(e)=>setPostalCode(e.target.value)} className='block outline-none  border border-gray-700 rounded-3xl  w-[350px] sm:min-w-[400px] pl-4 pr-4 pt-2 pb-2' placeholder='enter postal code'/>
              </div>
              <div className='flex flex-col gap-6 mt-7'>
                <label htmlFor="country">Country</label>
                <input type="text" id='country' name='country' value={country} onChange={(e)=>setCountry(e.target.value)} className='block outline-none  border border-gray-700 rounded-3xl  w-[350px] sm:min-w-[400px] pl-4 pr-4 pt-2 pb-2' placeholder='enter country'/>
              </div>
              
              <div className='flex gap-6 mt-7 items-center'>
                <button type='submit' className='text-lg font-bold bg-gray-700 text-white hover:opacity-75 pl-4 pr-4 pt-2 pb-2 '
                >Continue</button>
                
              </div>
            </form>

          </div>
          </div>
      </div>
      
    </>
  )
}

export default ShippingPage