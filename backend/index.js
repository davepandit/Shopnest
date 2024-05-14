import dotenv from 'dotenv';
dotenv.config()
import express from "express"
import products from './data/data.js';
import connectToDatabase from './config/db.js';
import ProdcutRouter from './routes/products.routes.js'

const port = process.env.PORT

//database connection 
connectToDatabase()

const app = express()

app.get('/' , (req , res)=>{
    res.send("Api is up and running!!⚙️")
})

app.use('/api/products' , ProdcutRouter)

app.listen(port , ()=>{
    console.log(`Server is running at port ${port} 🪛`)
})