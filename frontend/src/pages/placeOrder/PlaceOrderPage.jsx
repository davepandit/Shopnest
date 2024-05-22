import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import CheckoutStatus from '../../components/checkoutStatus/CheckoutStatus';
import { clearCartItems } from '../../../slice/cart';
import { useCreateOrderMutation } from '../../../slice/order';
import {ColorRing} from 'react-loader-spinner'


const PlaceOrderPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const cart = useSelector((state) => state.cart);
    const [createOrder, { isLoading, error }] = useCreateOrderMutation();

    // checking if the shipping address and the payment method is there ir not 
    useEffect(()=>{
        if (!cart.shippingAddress.address) {
            navigate('/shipping');
          }else if (!cart.paymentMethod) {
            navigate('/payment');
          }
    },[cart.paymentMethod, cart.shippingAddress.address, navigate])

    const navigateToProductScreen = (id) => {
      navigate(`/products/${id}`)
    }

    const handleCreateOrder = async() => {
      try {
        const res  = await createOrder({
          orderItems: cart.cartItems,
          shippingAddress: cart.shippingAddress,
          paymentMethod: cart.paymentMethod,
          itemsPrice: cart.itemsPrice,
          shippingPrice: cart.shippingPrice,
          totalPrice: cart.totalPrice,
        }).unwrap()
        dispatch(clearCartItems())
        navigate(`/order/${res._id}` , { replace: true })
      } catch (error) {
        toast.error(error)
        
      }

    }
  return (
    <>
        <div className='flex justify-center mt-11 gap-4 pl-7 pr-7 sm:pl-0 sm:pr-0 sm:gap-6'><CheckoutStatus step1 step2 step3 step4 /></div>
        <div className='flex flex-col sm:flex-row justify-around max-w-[2000px] mx-auto mt-14 mb-28'>
          {/* left section  */}
          <div className='flex flex-col gap-5 pl-7 pr-7 sm:p-0'>
            <div className='flex flex-col gap-1'>
              <span className='text-gray-500 font-bold text-3xl'>Shipping</span>
              <span className='text-sm font-bold text-gray-700 '>Address: <span>{cart.shippingAddress.address} , {cart.shippingAddress.city} , {cart.shippingAddress.postalCode} , {cart.shippingAddress.country}</span></span>
            </div>

            <div className='flex flex-col gap-1'>
              <span className='mt-5 text-gray-500 font-bold text-3xl'>Payment Method</span>
              <span className='text-sm font-bold text-gray-700 '>Method: {cart.paymentMethod}</span>
            </div>

            <span className='text-gray-500 font-bold text-3xl'>Order Items</span>
            {cart.cartItems.length == 0 ? (
              <div className='text-gray-500 font-bold text-7xl'>
                Cart is empty!!!
              </div>
            ) : (
              <div className='flex flex-col gap-5'>
                {cart.cartItems.map((item)=>(
                  <div className='flex gap-6  items-center'>
                    <div className='flex gap-2 items-center w-[310px] md:w-[250px] lg:min-w-[500px]'>
                      <img src={item.imageURL} alt={item.name} className='w-[100px] h-[100px]'/>
                      <span className='whitespace-normal hover:underline hover:cursor-pointer' onClick={()=>(navigateToProductScreen(item._id))}>{item.name}</span>
                    </div>
                    <span>
                      {item.qty} x Rs.{item.price} = Rs.{(item.qty*item.price).toFixed(2)}
                    </span>
                    

                  </div>
                ))}
              </div>
              
            )}
          </div>
          {/* right section  */}
          <div className='flex flex-col gap-5 mt-7 sm:mt-0 pl-7 pr-7 sm:p-0'>
            <span className='text-gray-500 font-bold text-3xl '>Order Summary</span>
            <div className='flex justify-between'>
              <span>Items:</span>
              <span>Rs.{cart.itemsPrice}</span>
            </div>
            <div className='flex justify-between'>
              <span>Shipping:</span>
              <span>Rs.{cart.shippingPrice}</span>
            </div>
            <div className='flex justify-between'>
              <span>Total:</span>
              <span>Rs.{cart.totalPrice}</span>
            </div>

            {error ? (<div className='bg-red-500 text-white'>{error}</div>) : (null)}
            <button className='text-lg font-bold bg-gray-700 text-white hover:opacity-75 pl-4 pr-4 pt-2 pb-2' onClick={handleCreateOrder} disabled={cart.cartItems.length == 0}>Place Order</button>
            {isLoading && (<div className=''><ColorRing
              visible={true}
              height="80"
              width="80"
              ariaLabel="color-ring-loading"
              wrapperStyle={{}}
              wrapperClass="color-ring-wrapper"
              colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
              /></div>)}
          </div>
        </div>
    </>
  )
}

export default PlaceOrderPage