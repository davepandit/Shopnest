import React from 'react'
import { FaStar } from "react-icons/fa";
import { FaStarHalfAlt } from "react-icons/fa"
import { FaRegStar } from "react-icons/fa";

const Rating = ({value , text}) => {
  return (
    <>
        <div className='flex items-center gap-3'>
            <div className='flex items-center gap-1'>
                <span>
                    {
                        value >= 1 ? <FaStar /> : value >= 0.5 ? <FaStarHalfAlt /> : <FaRegStar />
                    }
                </span>
                <span>
                    {
                        value >= 2 ? <FaStar /> : value >= 1.5 ? <FaStarHalfAlt /> : <FaRegStar />
                    }
                </span>
                <span>
                    {
                        value >= 3 ? <FaStar /> : value >= 2.5 ? <FaStarHalfAlt /> : <FaRegStar />
                    }
                </span>
                <span>
                    {
                        value >= 4 ? <FaStar /> : value >= 3.5 ? <FaStarHalfAlt /> : <FaRegStar />
                    }
                </span>
                <span>
                    {
                        value >= 5 ? <FaStar /> : value >= 4.5 ? <FaStarHalfAlt /> : <FaRegStar />
                    }
                </span>
            </div>
            <span>
                {text ? text : null}
            </span>
        </div>
    </>
  )
}

export default Rating