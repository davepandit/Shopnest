import React, { useState } from 'react'
import { useGetProductsQuery } from '../../../slice/products'
import { useCreateProductMutation } from '../../../slice/products';
import {ColorRing} from 'react-loader-spinner'
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'



const ProductForAdmin = () => {
  const [price , setPrice] = useState(0)
  const {data:products , isLoading , error , refetch} = useGetProductsQuery()
  const [createProduct , {isLoading:productLoading }] = useCreateProductMutation()
  const navigate = useNavigate()

  const deleteProduct = (id) => {
    console.log('processing')
  }

  const handleCreateProduct = async () => {
    if (window.confirm('Are you sure you want to create a new product?')) {
      try {
        const response = await createProduct().unwrap();
        refetch();
        console.log('Created Product:' , response)
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };
  return (
    <>
      <div className='mt-11 mb-28 flex justify-center items-center flex-col'>
        <div className='text-5xl font-bold text-gray-700 text-center'>Products</div>
        {
          productLoading && (
            <div className=''><ColorRing
              visible={true}
              height="80"
              width="80"
              ariaLabel="color-ring-loading"
              wrapperStyle={{}}
              wrapperClass="color-ring-wrapper"
              colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
              /></div>
          )
        }
        {isLoading ? (<div className=''><ColorRing
              visible={true}
              height="80"
              width="80"
              ariaLabel="color-ring-loading"
              wrapperStyle={{}}
              wrapperClass="color-ring-wrapper"
              colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
              /></div>) : (error ? (<div>Something went wrong</div>) : (
        <div className=' w-[350px] overflow-x-scroll md:w-[750px] md:overflow-x-scroll lg:w-auto lg:overflow-auto'>
          <table className='divide-y divide-gray-300 mt-9'>
            <thead className='bg-gray-200'>
                <tr>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>ID</th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>name</th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>price</th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>category</th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>brand</th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'></th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'></th>
                  
                </tr>
            </thead>
            <tbody className='bg-white divide-y divide-gray-200'>
                {
                  products.map((product)=>{
                    return (
                      <tr>
                        <td className='px-2 py-4 whitespace-nowrap'>{product._id}</td>
                        <td className='px-2 py-4 whitespace-nowrap'>{product.name}</td>
                        <td className='px-2 py-4 whitespace-nowrap'>Rs.{product.price}</td>
                        <td className='px-2 py-4 whitespace-nowrap'>
                        {product.category}
                        </td>
                        <td className='px-2 py-4 whitespace-nowrap'>
                        {product.brand}
                        </td>
                        <td className='px-2 py-4 whitespace-nowrap flex gap-6 justify-center items-center'>
                          <FaEdit onClick={()=>(navigate(`/admin/product/${product._id}/edit`))} className='text-xl hover:opacity-55 hover:cursor-pointer'/>
                          <MdDelete onClick={()=>deleteProduct(product._id)} className='text-xl hover:opacity-55 hover:cursor-pointer' style={{color:'red'}}/>
                        </td>
                      </tr>
                    )
                  })
                }
            </tbody>
          </table>
          <div className='flex justify-center mt-11'>
            <button className='text-lg font-bold bg-gray-700 text-white hover:opacity-75 pl-4 pr-4 pt-2 pb-2' onClick={handleCreateProduct}>Create a Product</button>

          </div>
        </div>
        ))}
      </div>
    </>
  )
}

export default ProductForAdmin