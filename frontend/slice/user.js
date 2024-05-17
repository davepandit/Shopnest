import { USERS_URL } from "../src/constants";
import { apiSlice } from "./api";

const userSlice = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        login: builder.mutation({
            query:(data)=>({
                url:`/${USERS_URL}/login`,
                method:'POST',
                body:data
            })
        })
    })
})

export const {useLoginMutation} = userSlice