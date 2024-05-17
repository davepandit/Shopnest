import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../slice/api";
import cartSliceReducer from '../slice/cart'
import authSliceReducer from '../slice/auth'
import auth from "../slice/auth";

const store = configureStore({
    reducer:{
        [apiSlice.reducerPath]:apiSlice.reducer,
        cart: cartSliceReducer,
        auth: authSliceReducer
    },
    middleware: (getDefaultMiddleware)=>
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools:true
})

export default store