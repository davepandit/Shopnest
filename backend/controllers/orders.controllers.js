import Order from "../models/orders.models.js";
import { instance } from "../index.js";
import crypto from 'crypto';



export const checkout = async(req , res) => {
    try {
        const options = {
            amount: Number(req.body.amount * 100),  // amount in the smallest currency unit
            currency: "INR",
          };
          const order = await instance.orders.create(options);
        //   console.log(order)
          //sending back the details added automatically by razorpay
          res.status(200).json(order)
    } catch (error) {
        res.status(400).json({error:error.message})
    }

}

export const paymentVerification = async(req , res) => {
    try {
        // console.log(req.body)
        const {id} = req.params
        const {razorpay_payment_id , razorpay_order_id , razorpay_signature } = req.body

        const body =  razorpay_order_id + "|" + razorpay_payment_id 
        
      //   matching the signature 
        const expectedSignature = crypto.createHmac('sha256' , process.env.RAZORPAY_API_SECRET).update(body.toString()).digest('hex')

        const isVerified = expectedSignature === razorpay_signature
        
        if(isVerified){
          // save to the database
        //   const createdDoc = await Payment.create({
        //     razorpay_payment_id:razorpay_payment_id,
        //     razorpay_order_id:razorpay_order_id,
        //     razorpay_signature :razorpay_signature 


        //   })
        //   console.log(createdDoc)
        const order = await Order.findById(id)

        if(order){
            order.isPaid = true
            order.paidAt = Date.now()
            order.paymentResult = {
                razorpay_payment_id : razorpay_payment_id,
                razorpay_order_id : razorpay_order_id,
                razorpay_signature : razorpay_signature
            }

            const updatedOrder = await order.save()
            // res.status(200).json(updatedOrder);

        }
          res.redirect(`http://localhost:5173/order/${id}`)

        }
        else{
          res.send('error')
        }

  } catch (error) {
      res.status(400).json({error:error.message})
  }
}
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

export const updateOrderToPaid = async(req , res) => {
    res.send('updated')
}

export const updateOrderToDelivered = async(req , res) => {
    try {
        const order = await Order.findById(req.params.id)
        if(order){
            order.isDelivered = true,
            order.deliveredAt = Date.now()

            const updatedOrder = await order.save()

            res.status(200).json(updatedOrder)
        }else{
            res.status(400).json({error:'Couldn\'t find order'})
        }
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

export const getOrders = async(req , res) => {
    const orders = await Order.find({}).populate('user' , 'id name')
    res.status(200).json(orders)
}
