import React from 'react'
import { useGetAllOrdersQuery } from '../../../slice/order'
import {ColorRing} from 'react-loader-spinner'
import { FaTimes } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';



const OrderList = () => {
  const {data:orders , isLoading , refetch} = useGetAllOrdersQuery()
  const navigate = useNavigate()
  const handleRefresh = () => {
    refetch()
  }
  return (
    <>
      <div className='mt-11 mb-28 flex flex-col justify-center items-center'>
        <div className='text-5xl font-bold text-gray-700'>
          Orders
        </div>
        {/* here goes the table  */}
        {isLoading ? (
          <div className='flex justify-center'><ColorRing
          visible={true}
          height="80"
          width="80"
          ariaLabel="color-ring-loading"
          wrapperStyle={{}}
          wrapperClass="color-ring-wrapper"
          colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
          /></div>
        ) : (
        <div className='w-[350px] overflow-x-scroll md:w-[750px] md:overflow-x-scroll lg:w-auto lg:overflow-auto'>
          <table className='divide-y divide-gray-300 mt-9'>
            <thead className='bg-gray-200'>
              <tr>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>ID</th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>User</th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>date</th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Total</th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>paid</th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>delivered</th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'></th>
              </tr>
            </thead>
            <tbody className='bg-white divide-y divide-gray-200'>
              {orders.map((order)=>{
                return (
                  <tr>
                    <td className='px-2 py-4 whitespace-nowrap'>{order._id}</td>
                    <td className='px-2 py-4 whitespace-nowrap'>{order.user && order.user.name}</td>
                    <td className='px-2 py-4 whitespace-nowrap'>{order.createdAt.substring(0, 10)}</td>
                    <td className='px-2 py-4 whitespace-nowrap'>
                    Rs.{order.totalPrice}
                    </td>
                    <td className='px-2 py-4 whitespace-nowrap'>
                    {order.isPaid ? (
                        order.paidAt.substring(0, 10)
                      ) : (
                        <FaTimes style={{ color: 'red' }} />
                      )}
                    </td>
                    <td className='px-2 py-4 whitespace-nowrap flex justify-center items-center'>
                      {order.isDelivered ? (
                        order.deliveredAt.substring(0, 10)
                      ) : (
                        <FaTimes style={{ color: 'red' }} />
                      )}
                    </td>
                    <td>
                      <button onClick={()=>(navigate(`/order/${order._id}`))} className='bg-gray-400 pl-3 pr-3 pt-1 pb-1 hover:opacity-55 duration-300 ease-in-out'>
                        Details
                      </button>
                    </td>
                  </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          )}
          <div className='mt-9 flex justify-center'>
            <button className='bg-gray-400 pl-3 pr-3 pt-1 pb-1 hover:opacity-55 duration-300 ease-in-out' onClick={handleRefresh}>
              Refresh
            </button>
          </div>
      </div>
    </>
  )
}

export default OrderList