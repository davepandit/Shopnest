import React, { useEffect, useState } from 'react'
import Button from '../../utils/Button'
import { Link, useParams } from 'react-router-dom'
import data from '../../data'
import Rating from '../../components/rating/Rating'
import { useGetProductDetailsQuery } from '../../../slice/products'

const ProductPage = () => {
  const {id} = useParams()
  const {data:product , isLoading , isError} = useGetProductDetailsQuery(id)
  
  
  return (
    <>
      {isLoading ? (<div><h1>Loading.....</h1></div>) : (<>
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
          <span>Quantity : 1</span>
          <Button text={'Add to Cart'} count={product.countInStock}/>
        </div>
        <div className='border-t border-gray-400 sm:hidden'></div>

      </div>
      </>) }
      
    </>
  )
}

export default ProductPage