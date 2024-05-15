import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Button = ({text , count=1}) => {
  const [disabled , setDisabled] = useState(false)
  const navigate = useNavigate()
  const redirect = () => {
    navigate('/')
  }
  useEffect(()=>{
    if(count == 0){
      setDisabled(true)
    }
  }, [])
  return (
    <>
        <button className={` text-white pl-4 pr-4 pt-2 pb-2 font-bold ${disabled ? 'hover:cursor-not-allowed hover:opacity-100 bg-disabledColor' : 'hover:opacity-75 bg-gray-700'} `} disabled={(count == 0)}
        onClick={redirect}
        >{text}</button>
    </>
  )
}

export default Button