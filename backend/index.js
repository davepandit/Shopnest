import dotenv from 'dotenv';
dotenv.config()
import express from "express"
import products from './data/data.js';
import connectToDatabase from './config/db.js';

const port = process.env.PORT

//database connection 
connectToDatabase()

const app = express()

app.get('/' , (req , res)=>{
    res.send("Api is up and running!!⚙️")
})

app.get('/api/products' , (req , res)=>{
    res.json(products)
})

app.get('/api/products/:id' , (req , res)=>{
    res.json(products.find((product)=>(product.id == req.params.id)))
})

app.listen(port , ()=>{
    console.log(`Server is running at port ${port} 🪛`)
})