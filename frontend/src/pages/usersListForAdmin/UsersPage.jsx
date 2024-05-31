import React from 'react'
import {ColorRing} from 'react-loader-spinner'
import { useGetUsersQuery , useDeleteUserMutation } from '../../../slice/user'
import { FaTimes } from "react-icons/fa";
import { TiTick } from "react-icons/ti";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import {toast} from 'react-toastify'


const UsersPage = () => {

  //getting the users details
  const {data:users , isLoading , refetch , error} = useGetUsersQuery()
  const [deleteUser , {isLoading:deleteLoading}] = useDeleteUserMutation()


  // delete handler 
  const deleteUserHandler = async(id) => {
    if(window.confirm('Are you sure that you want to delete this user')){
      try {
        const res = await deleteUser(id).unwrap()
        toast.success(`${res.message}`,{
          autoClose:2000
        })
        refetch()
      } catch (error) {
        toast.error(`${error.message}` , {
          autoClose:2000
        })
      }
    }
  }
  return (
    <>
      <div className='mt-11 mb-28 flex flex-col justify-center items-center'>
        <div className='text-5xl font-bold text-gray-700'>
          Users
        </div>
        {deleteLoading && (
          <div className='flex justify-center'><ColorRing
          visible={true}
          height="80"
          width="80"
          ariaLabel="color-ring-loading"
          wrapperStyle={{}}
          wrapperClass="color-ring-wrapper"
          colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
          /></div>
        )}
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
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Name</th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>email</th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>admin</th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'></th>
                  
                </tr>
              </thead>
              <tbody className='bg-white divide-y divide-gray-200'>
                {users.map((user)=>{
                  return(
                    <tr>
                      <td className='px-2 py-4 whitespace-nowrap'>{user._id}</td>
                      <td className='px-2 py-4 whitespace-nowrap'>{user.name}</td>
                      <td className='px-2 py-4 whitespace-nowrap'>{user.email}</td>
                      <td className='px-2 py-4 whitespace-nowrap justify-center items-center mx-auto'>
                        {user.isAdmin ? (<TiTick style={{ color: 'green' }}/>) : (<FaTimes style={{ color: 'red' }} />)}
                      </td>
                      <td className='px-2 py-4 whitespace-nowrap flex gap-6 justify-center items-center'>
                          <FaEdit onClick={()=>(navigate(`/admin/user/${user._id}/edit`))} className='text-xl hover:opacity-55 hover:cursor-pointer'/>
                          <MdDelete onClick={()=>deleteUserHandler(user._id)} className='text-xl hover:opacity-55 hover:cursor-pointer' style={{color:'red'}}/>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}

      </div>
    </>
  )
}

export default UsersPage