import React from 'react'
import { useNavigate } from 'react-router-dom'

const Paginate = ({page , pages , isAdmin=false}) => {
    const navigate = useNavigate()
    //making an array such that i can mapp through it and create as many buttons as i want
    const numberOfButtons = Array.from({length:pages} , (_ , index)=>index)
  return (
    <>
       {numberOfButtons.map((item)=>{
        return (
            <div className='inline-block'>
                {isAdmin ? (
                    <button className='text-base font-bold bg-gray-700 text-white pl-4 pr-4 pt-1 pb-1 ml-3 hover:opacity-55 duration-300 ease-in-out' onClick={()=>(navigate(`/admin/productlist/?pageNumber=${item + 1}`))}>{item + 1}</button>
                ) : (
                    <button className='text-base font-bold bg-gray-700 text-white pl-4 pr-4 pt-1 pb-1 ml-3 hover:opacity-55 duration-300 ease-in-out' onClick={()=>(navigate(`/?pageNumber=${item + 1}`))}>{item + 1}</button>
                )}
            </div>
            
        )
       })}
    </>
  )
}

export default Paginate


