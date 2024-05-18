import React from 'react'
import { Link } from 'react-router-dom'

const CheckoutStatus = ({step1 , step2 , step3 , step4}) => {
  return (
    <>
        {step1 ? (<Link to='/login'><span className='hover:cursor-pointer hover:underline'>Sign In</span></Link>) : (<span className='opacity-55'>Sign In</span>)}
        {step2 ? (<Link to='/shipping'><span className='hover:cursor-pointer hover:underline'>Shipping</span></Link>) : (<span className='opacity-55'>Shipping</span>) }
        {step3 ? (<Link to='/payment'><span className='hover:cursor-pointer hover:underline'>Payment</span></Link>) : (<span className='opacity-55'>Payment</span>) }
        {step4 ? (<Link to='/order'><span className='hover:cursor-pointer hover:underline'>Place Order</span></Link>) : (<span className='opacity-55'>Place Order</span>) }
    </>
  )
}

export default CheckoutStatus