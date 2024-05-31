import dotenv from 'dotenv';
dotenv.config()
import express from "express"
import products from './data/data.js';
import connectToDatabase from './config/db.js';
import ProdcutRouter from './routes/products.routes.js'
import UserRouter from './routes/users.routes.js'
import OrderRouter from './routes/orders.routes.js'
import uploadRouter from './routes/upload.routes.js'
import cookieParser from 'cookie-parser';
import Razorpay from 'razorpay';
import path from 'path'

const port = process.env.PORT

//database connection 
connectToDatabase()

const app = express()

// setting up the current directory because in modulejs __dirname is not available 
export const __dirname = path.resolve()

//predefined middlewares
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use('/api/uploads' , express.static(path.resolve(__dirname , 'public/images')))



app.get('/' , (req , res)=>{
    res.send("Api is up and running!!⚙️")
})

app.use('/api/products' , ProdcutRouter)
app.use('/api/users' , UserRouter)
app.use('/api/orders' , OrderRouter)
app.use('/api/upload' , uploadRouter)

// razorpay instance
export const instance = new Razorpay({
    key_id: process.env.RAZORPAY_API_ID,
    key_secret: process.env.RAZORPAY_API_SECRET,
});

// route to get the razorpay id 
app.get('/api/getkey' , (req , res)=>{
    res.status(200).json({razorpayId: process.env.RAZORPAY_API_ID})
})

app.listen(port , ()=>{
    console.log(`Server is running at port ${port} 🪛`)
})