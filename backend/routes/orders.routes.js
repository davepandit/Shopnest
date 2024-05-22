import express from 'express'
import {addOrderItems,
    getMyOrders,
    getOrderById,
    updateOrderToPaid,
    updateOrderToDelivered,
    getOrders} from '../controllers/orders.controllers.js'
import { adminCheck , validateToken } from '../middlewares/auth.middleware.js'

const router = express.Router()

router.post('/' , validateToken , addOrderItems)
router.get('/' , validateToken , adminCheck , getOrders)
router.get('/mine' , validateToken , getMyOrders)
router.get('/:id' , validateToken , getOrderById)
router.put('/:id/pay' , validateToken , updateOrderToPaid)
router.put('/:id/deliver' , validateToken , adminCheck , updateOrderToDelivered)

export default router