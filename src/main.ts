// main 
import express from "express"
import productRouter from "./router/productRouter"
import categoryRouter from "./router/categoryRouter"
import userRouter from "./router/userRouter"
const app=express()
app.use(express.json())
const PORT=3000

app.use("/product",productRouter)
app.use("/category",categoryRouter)
app.use("/user",userRouter)

app.listen(PORT ,()=>{
    console.log("you are in server Port no:",PORT)
})