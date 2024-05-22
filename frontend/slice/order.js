import { apiSlice } from "./api";
import {ORDERS_URL} from '../src/constants'

export const orderSlice = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        createOrder : builder.mutation({
            query:(order)=>({
                url:`${ORDERS_URL}`,
                method:'POST',
                body:{...order}
            })
        }),
        getOrderDetails : builder.query({
            query:(orderId)=>({
                url:`${ORDERS_URL}/${orderId}`
            }),
            keepUnusedDataFor: 5
        })
    })
})


export const {useCreateOrderMutation , useGetOrderDetailsQuery} = orderSlice