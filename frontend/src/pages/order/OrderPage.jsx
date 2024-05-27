import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useGetOrderDetailsQuery } from '../../../slice/order';
import {ColorRing} from 'react-loader-spinner'
import { useNavigate } from 'react-router-dom';
import { useCheckoutMutation } from '../../../slice/order';
import { useGetRazorpayKeyQuery } from '../../../slice/order';
import { useDeliverOrderMutation } from '../../../slice/order';


const OrderPage = () => {
  const navigate = useNavigate()
  const {userInfo} = useSelector((state)=>state.auth)
  const [checkout , {isLoading:checkoutLoading}] = useCheckoutMutation()
  const {data:key , isLoading:keyLoading} = useGetRazorpayKeyQuery()
  const {id : orderId} = useParams()
  const cart = useSelector((state)=>state.cart)
  const {data:order , isLoading , refetch , error} = useGetOrderDetailsQuery(orderId)
  const [deliverOrder , {isLoading:deliverLoading}] = useDeliverOrderMutation()
  
  const navigateToProductScreen = (id) => {
    navigate(`/products/${id}`)
  }
  const checkoutHandler = async(amount) => {
    
    const response = await checkout(amount).unwrap()
    console.log('Response coming from orders Page:' , response)
    if(keyLoading){
      console.log('..Loading...')
    }else{
      console.log('key:' , key)
    }
    console.log('razorpayId:' , key.razorpayId)
    console.log(window)
    
    
    // render the razorpay modal 
    const options = {
      key: key.razorpayId,
      amount: response.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "Dave Pandit",
      description: "Test Transaction",
      image: "https://avatars.githubusercontent.com/u/145253619?v=4",
      order_id: response.id, 
      callback_url: `http://localhost:8000/api/orders/paymentverification/${orderId}`,
      prefill: {
          name: userInfo.name,
          email: userInfo.email,
          contact: "9000090000"
      },
      notes: {
          "address": "Razorpay Corporate Office"
      },
      theme: {
          "color": "#3399cc"
      }
  };
  const razor = new window.Razorpay(options);
      razor.open();
  }


  const handleMarkasDelivered = async() => {
    try {
      await deliverOrder(orderId).unwrap()
      refetch()
      toast.success("Order delivered" ,{
        autoClose: 2000
      })
    } catch (error) {
      toast.error(error.message , {
        autoClose:2000
      })
    }
  }

  
  
  
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
                  <span className='whitespace-normal hover:underline hover:cursor-pointer' onClick={()=>navigateToProductScreen(product.product)}>{product.name}</span>
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
              <span>Rs.{order.itemsPrice}</span>
            </div>
            <div className='flex justify-between'>
              <span>Shipping:</span>
              <span>Rs.{order.shippingPrice}</span>
            </div>
            <div className='flex justify-between'>
              <span>Total:</span>
              <span>Rs.{order.totalPrice}</span>
            </div>
            {!order.isPaid && (
              <div className='flex justify-center'>
                <button className='text-lg font-bold bg-gray-700 text-white hover:opacity-75 pl-4 pr-4 pt-2 pb-2' onClick={()=>checkoutHandler(order.totalPrice)}>Pay Now</button>
              </div>
            )}

            {deliverLoading && (
              <div className='flex justify-center items-center h-screen'><ColorRing
              visible={true}
              height="80"
              width="80"
              ariaLabel="color-ring-loading"
              wrapperStyle={{}}
              wrapperClass="color-ring-wrapper"
              colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
              /></div>
            )}
            {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
              <div className='flex justify-center'>
                <button className='text-lg font-bold bg-gray-700 text-white hover:opacity-75 pl-4 pr-4 pt-2 pb-2' onClick={handleMarkasDelivered}>Mark as delivered</button>
              </div>
            ) }
        </div>
    </div>
    
  
  </>))
}

export default OrderPage