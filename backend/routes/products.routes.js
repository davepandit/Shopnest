import express from 'express'
import products from '../data/data.js'
import { getAllProducts , getSingleProduct , createProduct , updateProduct, deleteProduct } from '../controllers/products.controllers.js' 
import { validateToken , adminCheck } from '../middlewares/auth.middleware.js'

const router = express.Router()

router.get('/' , getAllProducts)
router.post('/' , validateToken , adminCheck , createProduct)

router.get('/:id' , getSingleProduct)

// edit the already created product 
router.put('/:id' , validateToken , adminCheck , updateProduct)

//delete the product
router.delete('/:id' , validateToken , adminCheck , deleteProduct)

export default router