import React, { useEffect, useState } from 'react'
import Button from '../../utils/Button'
import { Link, useParams } from 'react-router-dom'
import data from '../../data'
import Rating from '../../components/rating/Rating'
import { useGetProductDetailsQuery } from '../../../slice/products'
import { ColorRing } from 'react-loader-spinner'
import Select from "react-dropdown-select"
import { addToCart } from '../../../slice/cart'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const ProductPage = () => {
  const [qty , setQty] = useState(1)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {id} = useParams()
  const {data:product , isLoading , isError , error} = useGetProductDetailsQuery(id)
  const stock = product?.countInStock
  //creating an array 
  const options = Array.from({length:stock}, (_, index)=>index)
  //so here options is an array
  //options = [0 , 1 , 2, 3 , 4, ....]
  const handleCartFunctionality = () => {
    dispatch(addToCart({...product , qty}))
    navigate('/cart')

  }


  
  
  return (
    <>
      {isLoading ? (<div className='flex justify-center items-center h-screen'><ColorRing
  visible={true}
  height="80"
  width="80"
  ariaLabel="color-ring-loading"
  wrapperStyle={{}}
  wrapperClass="color-ring-wrapper"
  colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
  /></div>) : (error) ? (<div>{error?.data?.message || error.error}</div>) : (<>
        <div className='pl-11 pr-11 mt-11 mb-11'>
          <Link to='/'><Button className='mt-11' text={'Go Back'}/></Link>
      </div>
      <div className='flex flex-col gap-11 sm:flex-row sm:gap-6 pl-7 pr-7 sm:pl-11 sm:pr-11 sm:justify-around mb-11'>
        {/* image goes here */}
        <div className=''>
          <img src={product.imageURL} alt="product image" className='w-[250px] h-[250px] sm:w-[300px] sm:h-[300px] lg:w-[400px] lg:h-[400px]'/>
        </div>
        <div className='border-t border-gray-400 sm:hidden'></div>
        {/* details section here */}
        <div className='flex flex-col gap-3 sm:max-w-[200px] lg:max-w-[400px] whitespace-normal'>
          <span>{product.name}</span>
          <span><Rating value={product.rating} text={`${product.numberOfReviews} reviews`}/></span>
          <span>Price : Rs.{product.price}</span>
          <span>{product.description}</span>

        </div>
        <div className='border-t border-gray-400 sm:hidden'></div>

        {/* status section here */}
        <div className='flex flex-col gap-3 '>
          <span>Price : Rs.{product.price}</span>
          <span>Status : {(product.countInStock) > 0 ? 'Instock' : 'Outofstock'}</span>
          {product.countInStock > 0 ? (<span className='flex gap-3 items-center'>Quantity: <select onChange={(e)=>setQty(parseInt(e.target.value))} value={qty}>{options.map((count , index)=>(<option key={index}>{parseInt(count)+1}</option>))}</select></span>): null}
          <button className='text-lg font-bold bg-gray-700 text-white hover:opacity-75 pl-4 pr-4 pt-2 pb-2'
          onClick={handleCartFunctionality}
          disabled={product.countInStock == 0}
          >Add to cart</button>
        </div>
        <div className='border-t border-gray-400 sm:hidden'></div>

      </div>
      </>) }
      
    </>
  )
}

export default ProductPage