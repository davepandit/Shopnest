import dotenv from 'dotenv';
dotenv.config()
import express from "express"
import products from './data/data.js';
import connectToDatabase from './config/db.js';
import ProdcutRouter from './routes/products.routes.js'
import UserRouter from './routes/users.routes.js'
import cookieParser from 'cookie-parser';

const port = process.env.PORT

//database connection 
connectToDatabase()

const app = express()

//predefined middlewares
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

app.get('/' , (req , res)=>{
    res.send("Api is up and running!!⚙️")
})

app.use('/api/products' , ProdcutRouter)
app.use('/api/users' , UserRouter)

app.listen(port , ()=>{
    console.log(`Server is running at port ${port} 🪛`)
})