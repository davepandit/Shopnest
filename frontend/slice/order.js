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
        }),
        checkout:builder.mutation({
            query:(amount)=>({
                url:`${ORDERS_URL}/checkout`,
                method:'POST',
                body:{amount}
            })
        }),
        getRazorpayKey:builder.query({
            query:()=>({
                url:'/api/getkey',
                method:'GET'
            })
        })
    })
})


export const {useCreateOrderMutation , useGetOrderDetailsQuery , useCheckoutMutation , useGetRazorpayKeyQuery} = orderSlice