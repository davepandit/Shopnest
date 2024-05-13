import React, { useEffect, useState } from 'react'
import data from '../../data'
import ProductCard from '../../utils/ProductCard'
import axios from 'axios';


const HomePage = () => {
    const [products , setProducts] = useState([{id:1 , name:'hello'}])

    useEffect(()=>{
        const fetchProducts = async () => {
            try {
                const response = await axios.get('/api/products');
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchProducts()

    } , [])

    console.log(products)

  return (
    <>
        <div className='flex justify-center items-center'>
            <div className='grid grig-cols-1 pl-3 pr-3 mt-7 gap-4 sm:grid-cols-3 sm:gap-6 sm:mt-11 sm:pl-11 sm:pr-11 sm:mb-11'>
                {products.map((product , key)=>(
                    <ProductCard product={product} key={key} />
                ))}
            </div>
            
        </div>
    </>
  )
}

export default HomePage


{/* <div  key={key}>
                <img src={product.image} alt="image" />
                {product.product_name}
            </div> */}