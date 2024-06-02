import React from 'react'
import { useState } from 'react'
import { useNavigate , useSearchParams } from 'react-router-dom'

const SearchBar = () => {
    const navigate = useNavigate()
    const [searchParams , setSearchParams] = useSearchParams()
    const searchFromURL = searchParams.get('search') || ''
    const [search , setSearch] = useState(searchFromURL)


    const handleSubmit = async(e) => {
        e.preventDefault()
        if(search.trim()){
            navigate(`/?pageNumber=1&&search=${search}`)
            setSearch('')
        }else{
            navigate('/')
        }
    }
  return (
    <>
        <form onSubmit={handleSubmit}>
            <div className='flex gap-3 items-center'>
                <input type="text" className='w-[100px] md:w-[300px] lg:w-[400px] outline-none  border border-gray-700 pl-4 pr-4 pt-2 pb-2 text-black' placeholder='search' value={search} onChange={(e)=>(setSearch(e.target.value))}/>
                <button className='text-white font-bold hover:opacity-55 bg-gray-500 pl-4 pr-4 pt-2 pb-2'>Search</button>
            </div>
            
        </form>
    </>
  )
}

export default SearchBar