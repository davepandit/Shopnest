import React from 'react'
import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import {ColorRing} from 'react-loader-spinner'
import { useGetUserDetailsQuery , useUpdateUserMutation } from '../../../slice/user';


const UserEditPage = () => {
    const {id} = useParams()
    const navigate = useNavigate()
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);

    const {data:user , isLoading , error , refetch} = useGetUserDetailsQuery(id)
    const [updateUser , {isLoading:updateLoading}] = useUpdateUserMutation()


    const handleBack = () => {
        navigate('/admin/userlist')
    }

    useEffect(()=>{
       if(user){
            setName(user.name)
            setEmail(user.email)
            setIsAdmin(user.isAdmin)
       }
    },[user])
    

    const handleSubmit = async(e) => {
        e.preventDefault()
        try {
            const res = await updateUser({
                _id:id,
                name:name,
                email:email,
                isAdmin:isAdmin
            }).unwrap()
            refetch()
            toast.success('User Profile Updated' , {
                autoClose:2000
            })
        } catch (error) {
            toast.error(`${error.message}` , {
                autoClose:2000
            })
        }
    }
  return (
    <>
        <div className='mb-28'>
            <div className='mt-11 pl-11'>
                <button className='text-lg font-bold bg-gray-700 text-white hover:opacity-75 pl-4 pr-4 pt-2 pb-2 ' onClick={handleBack}>Go Back</button>
            </div>
            <div>
                <div className='text-3xl text-center mt-11 font-bold text-gray-700 '>Edit User</div>
            </div>
            {updateLoading && (
                <div className='flex justify-center items-center'><ColorRing
                visible={true}
                height="80"
                width="80"
                ariaLabel="color-ring-loading"
                wrapperStyle={{}}
                wrapperClass="color-ring-wrapper"
                colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
                /></div>
            )}

            <div className='flex flex-col gap-11 justify-center items-center mt-7 pl-11 pr-11 mb-11'>
                <form onSubmit={handleSubmit}>
                    {/* name  */}
                    <div className='flex flex-col gap-6'>
                        <label htmlFor="name">Name</label>
                        <input type="text" id='name' name='name' value={name} onChange={(e)=>setName(e.target.value)} className='block outline-none  border border-gray-700 rounded-3xl  w-[350px] sm:min-w-[400px] pl-4 pr-4 pt-2 pb-2' placeholder='enter name'/>
                    </div>

                    {/* email  */}
                    <div className='flex flex-col gap-6 mt-7'>
                        <label htmlFor="email">Brand</label>
                        <input type="email" id='email' name='email' value={email} onChange={(e)=>setEmail(e.target.value)} className='block outline-none rounded-3xl sm:min-w-[400px] border w-[350px] border-gray-700 pl-4 pr-4 pt-2 pb-2' placeholder='enter email'/>
                    </div>

                    {/* <div className='flex mt-7'>
                        <input type="checkbox" checked={isAdmin} onChange={(e)=>(setIsAdmin(e.target.checked))} className='block outline-none  border border-gray-700 rounded-3xl  w-[350px] sm:min-w-[400px] pl-4 pr-4 pt-2 pb-2'/>
                        <label htmlFor="isAdmin">isAdmin</label>
                    </div> */}

                    <div className='mt-7 items-center'>
                        <input type="checkbox" id='isAdmin' name='isAdmin'onChange={(e)=>(setIsAdmin(e.target.checked))}/>
                        <label htmlFor="isAdmin">Is Admin</label>

                    </div>

                    {/* update button  */}
                    <button className='text-lg font-bold bg-gray-700 text-white hover:opacity-75 pl-4 pr-4 pt-2 pb-2 mt-7' type='submit'>Update</button>
                </form>
            </div>
        </div>
    </>
  )
}

export default UserEditPage