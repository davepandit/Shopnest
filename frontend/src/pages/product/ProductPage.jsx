import React, { useEffect, useState } from 'react'
import Button from '../../utils/Button'
import { Link, useParams } from 'react-router-dom'
import data from '../../data'
import Rating from '../../components/rating/Rating'
import { useGetProductDetailsQuery } from '../../../slice/products'
import { useCreateReviewMutation } from '../../../slice/products'
import { ColorRing } from 'react-loader-spinner'
import Select from "react-dropdown-select"
import { addToCart } from '../../../slice/cart'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Meta from '../../components/meta/Meta'

const ProductPage = () => {
  const [qty , setQty] = useState(1)
  //making states for the review and the comment
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {id} = useParams()
  const {data:product , isLoading , isError , error , refetch} = useGetProductDetailsQuery(id)
  const [createReview , {isLoading:reviewLoading}] = useCreateReviewMutation()
  const {userInfo} = useSelector((state)=>state.auth)
  const stock = product?.countInStock
  //creating an array 
  const options = Array.from({length:stock}, (_, index)=>index)
  //so here options is an array
  //options = [0 , 1 , 2, 3 , 4, ....]
  const ratingsOption = Array.from({ length: (10) + 1 }, (_, index) => (index % 2 === 0 ? index / 2 : (index - 1) / 2 + 0.5));
  const handleCartFunctionality = () => {
    dispatch(addToCart({...product , qty}))
    navigate('/cart')

  }

  const handleSubmit = async(e) => {
    e.preventDefault();

    try {
      await createReview({
        productId:id,
        rating,
        comment,
      }).unwrap();
      refetch();
      toast.success('Review created successfully');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
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
      <Meta title={product.name}/>
      <div className='pl-11 pr-11 mt-11 mb-11'>
          <Link to='/'><Button className='mt-11' text={'Go Back'}/></Link>
      </div>
      <div className='mb-28'>
        <div className='flex flex-col gap-11 sm:flex-row sm:gap-6 pl-7 pr-7 sm:pl-11 sm:pr-11 sm:justify-around'>
          {/* image goes here */}
          <div className=''>
            <img src={product.imageURL} alt="product image" className='w-[250px] h-[250px] sm:w-[300px] sm:h-[300px] lg:w-[400px] lg:h-[400px]'/>
          </div>
          <div className='border-t border-gray-400 sm:hidden'></div>
          {/* details section here */}
          <div className='flex flex-col gap-3 sm:max-w-[200px] lg:max-w-[400px] whitespace-normal'>
            <span>{product.name}</span>
            <span><Rating value={product.rating} text={`${product.numReviews} reviews`}/></span>
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
        <div className='flex flex-col gap-5 items-center'>
          <div className=' text-center text-3xl font-bold text-gray-700'>Reviews</div>
          {/* here are the reviews */}
          {product.reviews.length == 0 ? (
            <div className='text-lg font-bold text-gray-500'>
            No reviews for this product
            </div>
          ) : (
            <div>
            {product.reviews.map((review)=>{
              return (
                <div>
                  <div className='flex flex-col gap-2 w-[500px] overflow-auto border p-4'>
                    <span className='text-lg font-bold text-gray-500'>{review.name}</span>
                    <span>{review.comment}</span>
                    <span><Rating value={review.rating}/></span>
                    <span>{review.createdAt.substring(0 , 10)}</span>
                  </div>
                </div>
              )
            })}
          </div>
          )}
          {userInfo && (
            <div className='flex flex-col gap-2'>
            <span className='text-xl font-bold text-gray-700 text-center'>Create a review🚀</span>
            <form onSubmit={handleSubmit}>
              <div className='flex flex-col gap-3'>
                <div className='flex gap-2'>
                  <label htmlFor="rating">Rating:</label>
                  <select name="rating" id="rating" value={rating} onChange={(e)=>setRating(parseFloat(e.target.value))}>
                    {ratingsOption.map((option , index)=>{
                      return (
                        <option key={index}>
                          {option}
                        </option>
                      )
                    })}
                  </select>
                </div>
                <label htmlFor="comment">Comment</label>
                
                <textarea name="comment" id="comment" className='block outline-none  border border-gray-700 rounded-3xl  w-[350px] sm:min-w-[400px] pl-4 pr-4 pt-2 pb-2' value={comment} onChange={(e)=>setComment(e.target.value)} placeholder='share your views'></textarea>

              </div>
              {reviewLoading && (
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
              <button type='submit' className='text-lg font-bold bg-gray-700 text-white hover:opacity-75 pl-4 pr-4 pt-2 pb-2 mt-9' disabled={reviewLoading}>
                Submit
              </button>
            </form>
          </div>
          )}
        </div>
      </div>
      </>) }
      
    </>
  )
}

export default ProductPage


// {userInfo ? (
//   <div>
//     {product.reviews.length == 0 ? (
//     <div className='flex flex-col gap-2'>
//       <div className='text-lg font-bold text-gray-500'>
//         No reviews for this product
//       </div>
//       <div className='flex flex-col gap-2'>
//         <span className='text-xl font-bold text-gray-700 text-center'>Create a review🚀</span>
//         <form onSubmit={handleSubmit}>
//           <div className='flex flex-col gap-3'>
//             <div className='flex gap-2'>
//               <label htmlFor="rating">Rating:</label>
//               <select name="rating" id="rating" value={rating} onChange={(e)=>setRating(parseFloat(e.target.value))}>
//                 {ratingsOption.map((option , index)=>{
//                   return (
//                     <option key={index}>
//                       {option}
//                     </option>
//                   )
//                 })}
//               </select>
//             </div>
//             <label htmlFor="comment">Comment</label>
            
//             <textarea name="comment" id="comment" className='block outline-none  border border-gray-700 rounded-3xl  w-[350px] sm:min-w-[400px] pl-4 pr-4 pt-2 pb-2' value={comment} onChange={(e)=>setComment(e.target.value)} placeholder='share your views'></textarea>

//           </div>
//           {reviewLoading && (
//             <div className='flex justify-center items-center h-screen'><ColorRing
//             visible={true}
//             height="80"
//             width="80"
//             ariaLabel="color-ring-loading"
//             wrapperStyle={{}}
//             wrapperClass="color-ring-wrapper"
//             colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
//             /></div>
//           )}
//           <button type='submit' className='text-lg font-bold bg-gray-700 text-white hover:opacity-75 pl-4 pr-4 pt-2 pb-2 mt-9' disabled={reviewLoading}>
//             Submit
//           </button>
//         </form>
//       </div>
//     </div>
// ) : (
//   <div>
//     {product.reviews.map((review)=>{
//       return (
//         <div className='flex gap-5 w-[500px] overflow-auto'>
//           <span>{review.name}</span>
//           <span>{review.comment}</span>
//           <span><Rating value={review.rating}/></span>
//           <span>{review.createdAt.substring(0 , 10)}</span>
//         </div>
//       )
//     })}
//   </div>
// )}
// </div>
// ) : (
//   <div className='text-lg text-gray-500 font-bold'>
//     Please sign in to see the reviews
//   </div>
// )

// }