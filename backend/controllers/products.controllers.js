import Product from "../models/products.models.js"

export const getAllProducts = async(req , res) => {
    try {
        const products = await Product.find({})
        res.status(200).json(products)
    } catch (error) {
        res.status(400).json({error:error.message})
        
    }
}

export const getSingleProduct = async(req , res) => {
    try {
        const id = req.params.id
        const product = await Product.findById(id)
        if(!product) return res.status(404).json({meessage:'Not found!!'})
        res.status(200).json(product)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}
