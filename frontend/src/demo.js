import express from "express"
import data from "./data.js"


const app = express()

app.get('/' , (req , res)=>{
    res.send("Api is up and running!!⚙️")
})

app.get('/api/products' , (req , res)=>{
    res.json(data)
})

app.get('/api/products/:id' , (req , res)=>{
    res.json(data.find((product)=>(product.id == req.params.id)))
})

app.listen(8000 , ()=>{
    console.log("Server is running!!🪛 at port 8000")
})