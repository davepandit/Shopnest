import Product from "../models/products.models.js"

export const getAllProducts = async(req , res) => {
    const pageSize = 3
    const page = Number(req.query.pageNumber) || 1

    //here we are creating the query object which is the keywords so here we are searching for the keyword that is coming from the params
    const search = req.query.search
    ? {
        name: {
          $regex: req.query.search,
          $options: 'i',
        },
      }
    : {};
    try {
        //counting the total number of documents
        const count = await Product.countDocuments({...search})

        //would like to bring as many products as they are in a particular page
        //a great challenge is when the user is in the 2nd page then he would like to see the next 2 products or whatever the pageSize is but how to query the next doc i mean simply querying would generate the same set of docs as that in the first page itself so for that there is a skip method that skips docs from the top in the collection
        const products = await Product.find({...search}).limit(pageSize).skip(pageSize * (page-1))

        //sending the products
        res.status(200).json({products , page , count , pages:Math.ceil(count / pageSize)})
    } catch (error) {
        res.status(400).json({
            error:error.message
        })
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
            imageURL: '/images/sample1.jpg',
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


  //create a review user will pass the rating as a number and a comment
export const createProductReview = async(req , res) => {
    const { rating, comment } = req.body;
    try {
        const product = await Product.findById(req.params.id);

        // if product exists 
        if(product){
            const alreadyReviewed = product.reviews.find(
                (review) => review.user.toString() === req.user._id.toString()
            );
            if (alreadyReviewed) {
                res.status(400).json({
                    message:'Product already reviewed'
                });
                
            }
            else{
                const review = {
                    name: req.user.name,
                    rating: Number(rating),
                    comment,
                    user: req.user._id,
                };
    
                product.reviews.push(review);
    
                product.numReviews = product.reviews.length;
    
                product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;
    
                await product.save();
    
                res.status(201).json({ message: 'Review added' });
            }
            
        }else{
            res.status(404).json({
                message:'Product not found'
            });
        }
    } catch (error) {
        res.status(404).json({
            error:error.message
        })
    }
}