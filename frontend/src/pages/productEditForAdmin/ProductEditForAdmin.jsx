import React from 'react'
import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useGetProductDetailsQuery , useUpdateProductMutation , useUploadProductImageMutation} from '../../../slice/products';
import {ColorRing} from 'react-loader-spinner'


const ProductEditForAdmin = () => {
  // getting the id from the params 
  const {id:productId} = useParams()

  // setting up the component level state 
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [imageURL, setImageURL] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');


  // getting the particular product details 
  const {data:product , isLoading , error , refetch} = useGetProductDetailsQuery(productId)

  // update function from RTK query 
  const [updateProduct , {isLoading:updateLoading}] = useUpdateProductMutation()

  const [uploadProductImage , {isLoading:productImgLoading}] = useUploadProductImageMutation()

  // creating an instance for the navigate 
  const navigate = useNavigate();


  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setImageURL(product.imageURL);
      setBrand(product.brand);
      setCategory(product.category);
      setCountInStock(product.countInStock);
      setDescription(product.description);
    }
  }, [product]);

  const handleBack = () => {
    navigate('/admin/productlist')
  }

  //form handler
  const handleSubmit = async(e) => {
    e.preventDefault()
    try {
      const response = await updateProduct({
        _id:productId,
        name:name,
        price:price,
        imageURL:imageURL,
        brand:brand,
        category:category,
        description:description,
        countInStock:countInStock,

      }).unwrap()
      toast.success('Product updated',{
        autoClose:2000
      });
      refetch();
      navigate('/admin/productlist');
    } catch (error) {
      toast.error("Cannot Update Product Info",{
        autoClose:2000
      })
    }
  }

  const handleUploadImage = async(e) => {
    const formData = new FormData();
    formData.append('image', e.target.files[0])
    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success(res.message);
      setImageURL(res.imageURL);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  

  return (
    <>
    <div className='mb-28'>
      <div className='mt-11 pl-11'>
        <button className='text-lg font-bold bg-gray-700 text-white hover:opacity-75 pl-4 pr-4 pt-2 pb-2 ' onClick={handleBack}>Go Back</button>
      </div>
      <div>
        <div className='text-3xl text-center mt-11 font-bold text-gray-700 '>Edit Product</div>
      </div>
      {productImgLoading && (
        (<div className=''><ColorRing
        visible={true}
        height="80"
        width="80"
        ariaLabel="color-ring-loading"
        wrapperStyle={{}}
        wrapperClass="color-ring-wrapper"
        colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
        /></div>)
      )}
      <div className='flex flex-col gap-11 justify-center items-center mt-7 pl-11 pr-11 mb-11'>
            <form onSubmit={handleSubmit}>
              {/* name  */}
              <div className='flex flex-col gap-6'>
                <label htmlFor="name">Name</label>
                <input type="text" id='name' name='name' value={name} onChange={(e)=>setName(e.target.value)} className='block outline-none  border border-gray-700 rounded-3xl  w-[350px] sm:min-w-[400px] pl-4 pr-4 pt-2 pb-2' placeholder='enter name'/>
              </div>

              {/* product image  */}
              <div className='flex flex-col gap-6 mt-7'>
                <label htmlFor="name">Image</label>
                <input type="file" id='image' name='image' onChange={handleUploadImage} className='block outline-none  border border-gray-700 rounded-3xl  w-[350px] sm:min-w-[400px] pl-4 pr-4 pt-2 pb-2'/>
              </div>
              
              {/* price  */}
              <div className='flex flex-col gap-6 mt-7'>
                <label htmlFor="price">Price(In Rs.)</label>
                <input type="number" id='price' name='price' value={price} onChange={(e)=>setPrice(e.target.value)} className='block outline-none rounded-3xl sm:min-w-[400px] border w-[350px] border-gray-700 pl-4 pr-4 pt-2 pb-2' placeholder='enter price'/>
              </div>
              
              {/* brand  */}
              <div className='flex flex-col gap-6 mt-7'>
                <label htmlFor="brand">Brand</label>
                <input type="text" id='brand' name='brand' value={brand} onChange={(e)=>setBrand(e.target.value)} className='block outline-none rounded-3xl sm:min-w-[400px] border w-[350px] border-gray-700 pl-4 pr-4 pt-2 pb-2' placeholder='enter brand'/>
              </div>

              {/* Count in stock  */}
              <div className='flex flex-col gap-6 mt-7'>
                <label htmlFor="countInStock">CountInStock</label>
                <input type="number" id='countInStock' name='countInStock' value={countInStock} onChange={(e)=>setCountInStock(e.target.value)} className='block outline-none rounded-3xl sm:min-w-[400px] border w-[350px] border-gray-700 pl-4 pr-4 pt-2 pb-2' placeholder='countInStock'/>
              </div>

              {/* Category  */}
              <div className='flex flex-col gap-6 mt-7'>
                <label htmlFor="category">Category</label>
                <input type="text" id='category' name='category' value={category} onChange={(e)=>setCategory(e.target.value)} className='block outline-none rounded-3xl sm:min-w-[400px] border w-[350px] border-gray-700 pl-4 pr-4 pt-2 pb-2' placeholder='enter category'/>
              </div>

              {/* Description  */}
              <div className='flex flex-col gap-6 mt-7'>
                <label htmlFor="description">Description</label>
                <input type="text" id='description' name='description' value={description} onChange={(e)=>setDescription(e.target.value)} className='block outline-none rounded-3xl sm:min-w-[400px] border w-[350px] border-gray-700 pl-4 pr-4 pt-2 pb-2' placeholder='enter description'/>
              </div>

              {/* update button  */}
              <button className='text-lg font-bold bg-gray-700 text-white hover:opacity-75 pl-4 pr-4 pt-2 pb-2 mt-7' type='submit'>Update</button>
            </form>
          </div>
        </div>
    </>

  )
}


export default ProductEditForAdmin