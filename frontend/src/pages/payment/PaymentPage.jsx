import React from 'react'
import { useState , useEffect } from 'react'
import { savePaymentMethod } from '../../../slice/cart'
import { useDispatch , useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import CheckoutStatus from '../../components/checkoutStatus/CheckoutStatus'

const PaymentPage = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const cart = useSelector((state)=>state.cart)
    const {shippingAddress} = cart

    useEffect(()=>{
        if(!shippingAddress.address){
            navigate('/shipping')
        }
    },[shippingAddress , navigate])

    const [paymentMethod, setPaymentMethod] = useState('PayPal')
    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        navigate('/placeorder')
    }
  return (
    <>
        <div className='flex justify-center gap-10 sm:pl-11 sm:pr-11 max-w-[2000px] mx-auto pt-4 pb-4 items-center pl-7 pr-7'>
            <CheckoutStatus step1 step2 step3/>
        </div>
        <form onSubmit={handleSubmit}>
        <div className='flex flex-col gap-4 justify-center items-center max-w-[2000px] mx-auto mt-11'>
            <span className='text-3xl font-bold text-gray-500'>Payments Method</span>
            <span className='text-lg font-bold text-gray-400'>Select Method</span>
            <div>
                <input type="radio" id='payments' name='paymentMethod' value={paymentMethod} onChange={(e)=>{
                    return setPaymentMethod(e.target.value)
                }}/>
                <label htmlFor="payments">Paypal or Credit Card</label>
            </div>
        </div>
        <div className='justify-center flex  mt-11'>
            <button className='text-lg font-bold bg-gray-700 text-white hover:opacity-75 pl-4 pr-4 pt-2 pb-2'>Continue</button>
        </div>
        </form>
    </>
  )
}

export default PaymentPage