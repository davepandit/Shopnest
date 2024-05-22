import Order from "../models/orders.models.js";

export const addOrderItems = async(req , res) => {
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        totalPrice
    } = req.body
    try {
        if(orderItems && orderItems.length == 0){
            res.status(400).json({mssg:'No items ordered'})
        }
        else{
            const order = new Order({
                orderItems: orderItems.map((doc)=>({
                    ...doc,
                    product:doc._id,
                    _id:undefined
                })),
                user:req.user._id,
                shippingAddress,
                paymentMethod,
                itemsPrice,
                shippingPrice,
                totalPrice
            })
    
            const createdOrder = await order.save()
            res.json(createdOrder)
        }
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}


export const getMyOrders = async(req , res) => {
   try {
    const orders = await Order.find({user:req.user._id})
    res.status(200).json(orders)
   } catch (error) {
    res.status(400).json({error:error.message})
    
   }
}

export const getOrderById = async(req , res) => {
    const id = req.params.id
    const order = await Order.findById(id).populate('user' , 'name email')

    if(order){
        res.status(200).json(order)
    }else{
        res.status(400).json({mssg:'Order not found'})
    }
}

export const updateOrderToPaid = (req , res) => {
    res.send('Update the order')
}

export const updateOrderToDelivered = (req , res) => {
    res.send('Update the order to be delivered')
}

export const getOrders = (req , res) => {
    res.send('Get orders')
}