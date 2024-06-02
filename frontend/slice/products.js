import { PRODUCTS_URL , UPLOAD_URL } from "../src/constants";
import { apiSlice } from "./api";

export const productsSlice = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        getProducts: builder.query({
            query:({pageNumber})=>({
                url: PRODUCTS_URL,
                params:{
                    pageNumber
                }
            }),
            keepUnusedFor: 5, //means the data that was cached will get flushed after 5 sec if not used
            providesTags:['Product']

        }),
        getProductDetails: builder.query({
            query: (id)=>({
                url: `${PRODUCTS_URL}/${id}`

            }),
            keepUnusedFor: 5
        }),
        createProduct:builder.mutation({
            query:()=>({
                url:`${PRODUCTS_URL}`,
                method:"POST",
            }),
            invalidatesTags: ['Product']
        }),
        updateProduct:builder.mutation({
            query:(data)=>({
                url:`${PRODUCTS_URL}/${data._id}`,
                method:"PUT",
                body:data
            }),
            invalidatesTags:['Product']
        }),
        uploadProductImage:builder.mutation({
            query:(data)=>({
                url:`${UPLOAD_URL}`,
                method:'POST',
                body:data
            })
        }),
        deleteProduct:builder.mutation({
            query:(id)=>({
                url:`${PRODUCTS_URL}/${id}`,
                method:"DELETE"
            })
        }),
        createReview:builder.mutation({
            query:(data)=>({
                url: `${PRODUCTS_URL}/${data.productId}/reviews`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Product']
        })
    }),
})

export const { useGetProductsQuery , useGetProductDetailsQuery , useCreateProductMutation , useUpdateProductMutation , useUploadProductImageMutation , useDeleteProductMutation , useCreateReviewMutation } = productsSlice