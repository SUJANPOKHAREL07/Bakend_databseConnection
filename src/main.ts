// main 
import express from "express"
import productRouter from "./router/productRouter"
import categoryRouter from "./router/categoryRouter"
import userRouter from "./router/userRouter"
import orderRouter from "./router/orderRouter"
const app=express()
app.use(express.json())
const PORT=3000

app.use("/product",productRouter)
app.use("/category",categoryRouter)
app.use("/users",userRouter)
app.use("/orders",orderRouter)

app.listen(PORT ,()=>{
    console.log("you are in server Port no:",PORT)
})