import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useGetOrderDetailsQuery } from '../../../slice/order';
import {ColorRing} from 'react-loader-spinner'


const OrderPage = () => {
  const {id : orderId} = useParams()
  const cart = useSelector((state)=>state.cart)
  const {data:order , isLoading , refetch , error} = useGetOrderDetailsQuery(orderId)
  return isLoading ? (<div className='flex justify-center items-center h-screen'><ColorRing
  visible={true}
  height="80"
  width="80"
  ariaLabel="color-ring-loading"
  wrapperStyle={{}}
  wrapperClass="color-ring-wrapper"
  colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
  /></div>) : (error ? (<div className='bg-red-500 text-white'>Something went wrong!</div>) : (
  <>
    <div className='text-gray-500 font-bold text-center mt-7 text-xl sm:text-3xl'>
        OrderId: {order._id}
    </div>
    <div className='flex flex-col gap-5 sm:gap-0 sm:flex-row sm:justify-around mt-7 mb-28'>
        {/* left section  */}
        <div className='flex flex-col gap-5 pl-7 pr-7 sm:p-0'>
          <div className='flex flex-col gap-2'>
            <span className='text-xl sm:text-3xl text-gray-500 font-bold'>Shipping</span>
            <span><span className='text-gray-700 text-base font-semibold'>Name: </span> {order.user.name}</span>
            <span><span className='text-gray-700 text-base font-semibold'>Email: </span> {order.user.email}</span>
            <span><span className='text-gray-700 text-base font-semibold'>Address: </span> {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.postalCode}, {order.shippingAddress.country}</span>
            {order.isDelivered ? (<div className='bg-green-500 font-semibold text-center text-white pl-4 pr-4 pt-1 pb-1 rounded-lg '>Delivered</div>) : (<div className='bg-red-500 font-semibold text-center text-white pl-4 pr-4 pt-1 pb-1 rounded-lg'>Not Delivered</div>)}
          </div>

          <div className='flex flex-col gap-2'>
            <span className='text-3xl text-gray-500 font-bold'>Payment Method</span>
            <span><span className='text-gray-700 text-base font-semibold'>Method: </span> {cart.paymentMethod}</span>  
            {order.isPaid ? (<div className='bg-green-500 font-semibold text-center text-white pl-4 pr-4 pt-1 pb-1 rounded-lg'>Paid</div>) : (<div className='bg-red-500 font-semibold text-center text-white pl-4 pr-4 pt-1 pb-1 rounded-lg'>Not Paid</div>)}
          </div>

          <div className='flex flex-col gap-2'>
            <span className='text-3xl text-gray-500 font-bold'>Order Items</span>
            {order.orderItems.map((product)=>(
              <div className='flex gap-6 items-center'>
                <div className='flex gap-2 items-center min-w-[250px] md:w-[100px] lg:min-w-[500px]'>
                  <img src={product.imageURL} alt={product.name} className='w-[100px] h-[100px]'/>
                  <span lassName='whitespace-normal hover:underline hover:cursor-pointer'>{product.name}</span>
                </div>
                <span>
                  {product.qty} x Rs.{product.price} = Rs.{(product.qty*product.price).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </div>
        {/* right section  */}
        <div className='flex flex-col gap-5 pl-11 pr-11 sm:p-0'>
            <span className='text-gray-500 font-bold text-3xl'>Order Summary</span>
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
        </div>
    </div>
    
  
  </>))
}

export default OrderPage