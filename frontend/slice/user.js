import { USERS_URL } from "../src/constants";
import { apiSlice } from "./api";

const userSlice = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        login: builder.mutation({
            query:(data)=>({
                url:`${USERS_URL}/login`,
                method:'POST',
                body:data
            })
        }),
        register: builder.mutation({
            query:(data)=>({
                url:`${USERS_URL}/`,
                method:'POST',
                body:data
            })
        }),
        logout: builder.mutation({
            query:()=>({
                url:`${USERS_URL}/logout`,
                method:'POST',
            })
        })
    })
})

export const {useLoginMutation , useLogoutMutation , useRegisterMutation} = userSlice