import { createSlice, current } from "@reduxjs/toolkit";
import { updateCart } from "../src/utils/cart";




const initialState = localStorage.getItem('cart')?JSON.parse(localStorage.getItem('cart')):{cartItems:[] , shippingPrice:0 , itemsPrice:0 , totalPrice:0 ,  shippingAddress: {}, paymentMethod: 'PayPal'}
const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers:{
        addToCart:(state , action)=>{
            const item = action.payload
            const existingItem = state.cartItems.find((itemInCart)=>(item._id === itemInCart._id))

            if(existingItem){
                state.cartItems = state.cartItems.map((itemInCart)=>(existingItem._id === itemInCart._id ? item : itemInCart))

            }
            else{
                state.cartItems = [...state.cartItems , item]
            }

            updateCart(state)

            
        },
        removeFromCart: (state , action)=>{
            const id = action.payload
            state.cartItems = state.cartItems.filter((product)=>{
                return product._id !== id
            })

            updateCart(state)

        },
        saveShippingAddress:(state , action)=>{
            state.shippingAddress = action.payload
            localStorage.setItem('cart', JSON.stringify(state));
        },
        savePaymentMethod:(state , action)=>{
            state.paymentMethod = action.payload
            localStorage.setItem('cart' , JSON.stringify(state))
        },
        clearCartItems: (state, action) => {
            state.cartItems = [];
            localStorage.setItem('cart', JSON.stringify(state));
            // updateCart(state)
        },


    }
})

export const {addToCart , removeFromCart , saveShippingAddress , savePaymentMethod ,  clearCartItems} = cartSlice.actions
export default cartSlice.reducer