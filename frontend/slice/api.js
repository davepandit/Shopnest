import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {BASE_URL} from '../src/constants'

export const apiSlice = createApi({
    baseQuery: fetchBaseQuery({baseUrl: BASE_URL}),
    tagTypes:['Product' , 'Order' , 'User'],
    endpoints: (builder)=>({
        //since from the products slice we are injecting endpoints into this that is why there is no need for the builder to work here
    })
})