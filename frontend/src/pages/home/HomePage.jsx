import React, { useEffect, useState } from 'react'
import data from '../../data.js'
import ProductCard from '../../utils/ProductCard'
import { useGetProductsQuery } from '../../../slice/products.js'



const HomePage = () => {
    const {data:products , isLoading , isError } = useGetProductsQuery()

  return (
    <>
        {isLoading ? (<div><h1>Loading......</h1></div>) : (
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