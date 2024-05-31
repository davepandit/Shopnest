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

export const createProduct = async(req , res) => {
    try {
        const product = new Product({
            name: 'Sample name',
            price: 0,
            user: req.user._id,
            imageURL: '/images/sample.jpg',
            brand: 'Sample brand',
            category: 'Sample category',
            countInStock: 0,
            numReviews: 0,
            description: 'Sample description',
          })
          
        //   creating the product 
          const createdProduct = await product.save();
          res.status(201).json(createdProduct);
    } catch (error) {
        res.status(404).json({error:error.message})
    }
}

// edit the product 
export const updateProduct = async(req , res) => {
    const {name , price , brand , category , countInStock , imageURL , description} = req.body
    try {
        const product = await Product.findById(req.params.id)

        if(product){
            product.name = name,
            product.imageURL = imageURL,
            product.brand = brand,
            product.category = category,
            product.price = price,
            product.countInStock = countInStock,
            product.description = description


            const updatedProduct = await product.save()
            res.status(200).json(updatedProduct)

        }else{
            res.status(404).json('Product Not found')
        }
    } catch (error) {
        res.status(400).json({error:error.meessage})
    }
}

export const deleteProduct = async(req , res) => {
    const product = await Product.findById(req.params.id);

    try {
        if (product) {
            await Product.deleteOne({ _id: product._id });
            res.json({ message: 'Product removed' });
          } else {
            res.status(404).json({
              message:"Product Not Found"
            }
      
            )
          }
    } catch (error) {
        res.status(400).json({
            error:error.message
        })
    }
  }
