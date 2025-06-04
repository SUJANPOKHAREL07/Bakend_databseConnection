import mongoose, { Schema } from "mongoose";


const orderSchema=new Schema({
    userId:{type:Number,require:true}
})

const order=mongoose.model("Orders",orderSchema)
export default order