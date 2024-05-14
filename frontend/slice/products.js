import { PRODUCTS_URL } from "../src/constants";
import { apiSlice } from "./api";

export const productsSlice = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        getProducts: builder.query({
            query:()=>({
                url: PRODUCTS_URL,
            }),
            keepUnusedFor: 5 //means the data that was cached will get flushed after 5 sec if not used

        }),
        getProductDetails: builder.query({
            query: (id)=>({
                url: `${PRODUCTS_URL}/${id}`

            }),
            keepUnusedFor: 5
        })
    }),
})

export const { useGetProductsQuery , useGetProductDetailsQuery } = productsSlice