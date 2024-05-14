import express from 'express'
import products from '../data/data.js'
import { getAllProducts , getSingleProduct } from '../controllers/products.controllers.js' 

const router = express.Router()

router.get('/' , getAllProducts)

router.get('/:id' , getSingleProduct)

export default router