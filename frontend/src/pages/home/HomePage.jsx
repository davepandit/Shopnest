import React, { useEffect, useState } from 'react'
import data from '../../data.js'
import ProductCard from '../../utils/ProductCard'
import { useGetProductsQuery } from '../../../slice/products.js'
import {ColorRing} from 'react-loader-spinner'



const HomePage = () => {
    const {data:products , isLoading , isError , error } = useGetProductsQuery()

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
  /></div>) : (error) ? (<div>{error?.data?.message || error.error}</div>): (
            <div className='flex justify-center items-center'>
            <div className='grid grig-cols-1 pl-3 pr-3 mt-7 gap-4 sm:grid-cols-3 sm:gap-6 sm:mt-11 sm:pl-11 sm:pr-11 sm:mb-11'>
                {products.map((product , key)=>(
                    <ProductCard product={product} key={key} />
                ))}
            </div>
            
        </div>
        )}
        
    </>
  )
}

export default HomePage


{/* <div  key={key}>
                <img src={product.image} alt="image" />
                {product.product_name}
            </div> */}