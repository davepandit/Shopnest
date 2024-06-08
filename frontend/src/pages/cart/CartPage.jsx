import React from 'react'
import { useSelector } from 'react-redux'
import cart from '../../../slice/cart'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addToCart } from '../../../slice/cart'
import { MdDelete } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { removeFromCart } from '../../../slice/cart'
import { BsCartXFill } from "react-icons/bs";
import { useEffect } from 'react'
import Meta from '../../components/meta/Meta'

const CartPage = () => {
  const {cartItems} = useSelector((state)=>state.cart)
  const [button , setButton] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleNavigate = (id) => {
   navigate(`/products/${id}`)
  }

  const handleDeleteFromCart = (id) =>{
    dispatch(removeFromCart(id))
  }

  const handleToHomePage = () => {
    navigate('/')
  }

  const handleCheckout = () => {
    navigate('/login?redirect=/shipping')
  }

  useEffect(()=>{
    if(cartItems.length == 0){
      setButton(false)
    }
    else{
      setButton(true)
    }
  },[cartItems])
  
  
  return (
    <>
    <div className='max-w-[2000px] mx-auto'>
      <Meta title='Cart'/>
      <div className='pl-11 mt-11 font-bold text-4xl'>
        Cart
      </div>
      <div className='flex pl-11 pr-11 pt-7 pb-7 gap-24 mb-24'>
        <div className='flex flex-col gap-6'>
          {/* left section  */}
          {cartItems.length == 0 ? (<div className='flex flex-col gap-11 justify-center items-center'><BsCartXFill className='text-7xl min-w-[500px] opacity-40 '/>
          <button className='text-lg font-bold bg-gray-700 text-white hover:opacity-75 pl-4 pr-4 pt-2 pb-2 w-[300px]' onClick={handleToHomePage}>Shop Now</button>
          </div>) : null}
          {cartItems.map((product)=>(
            <div className='flex gap-6 items-center'>
              <span><img src={product.imageURL} alt="product image" className='w-[200px] h-[200px]'/></span>
              <span className='max-w-[300px] min-w-[300px] whitespace-normal hover:cursor-pointer hover:opacity-75' onClick={()=>(handleNavigate(product._id))}>{product.name}</span>
              <span>Rs.{product.price}</span>
              <span>Quantity: 
              <select onChange={(e)=>
              {
                const newQty = parseInt(e.target.value)
                dispatch(addToCart({...product , qty:newQty}))
              }} value={product.qty}>{Array.from({length:product.countInStock}, (_, index)=>index).map((count , index)=>(<option key={index}>{parseInt(count)+1}</option>))}</select>
                </span>
                <span className='text-2xl hover:cursor-pointer hover:opacity-75'
                onClick={()=>handleDeleteFromCart(product._id)}
                ><MdDelete /></span>
            </div>
          ))}
        </div>
        {/* right section  */}
        <div className='flex flex-col gap-6'>
          <span className='opacity-75 text-2xl font-bold whitespace-nowrap'>Subtotal ({cartItems.reduce((acc , product)=>{
            return acc + product.qty
          },0)}) items</span>
          <span>
            Rs.
            {cartItems.reduce((acc , product)=>{
              return acc + product.qty*product.price
            },0).toFixed(2)}
          </span>
          {
            button && <button className='text-lg font-bold bg-gray-700 text-white hover:opacity-75 pl-4 pr-4 pt-2 pb-2' disabled={cartItems.length == 0}
            onClick={handleCheckout}
            >
            Proceed to checkout
          </button>
          }
          
        </div>
      </div>
      </div>
    </>
  )
}

export default CartPage


{/* <select onChange={(e)=>setQty(parseInt(e.target.value))} value={product.qty}>{options.map((count , index)=>(<option key={index}>{parseInt(count)+1}</option>))}</select> */}


// onChange={(e)=>{
//   dispatch(addToCart({...product , qty:e.target.value}))
// }} 