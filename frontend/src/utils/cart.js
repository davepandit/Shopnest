const addDecimals = (num)=>{
    return (Math.round(num*100)/100).toFixed(2)
}

export const updateCart = (state) => {
    //calculate items price
    state.itemsPrice = addDecimals(state.cartItems.reduce((acc , item)=>{
        return acc + item.price*item.qty
    },0))

    //calculate the shipping price
    state.shippingPrice = addDecimals(state.itemsPrice > 500 ? 0 : 100)
    state.totalPrice = (Number(state.itemsPrice) + Number(state.shippingPrice)).toFixed(2)


    //save it into local storage
    localStorage.setItem('cart' , JSON.stringify(state))
}