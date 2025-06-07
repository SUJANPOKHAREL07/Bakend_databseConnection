import  { Schema } from "mongoose";
import mongoose from "../mogodbClient";

const orderSchema=new Schema({
userId:{type:mongoose.Types.ObjectId,ref:"Users",required:true},
productId:{type:mongoose.Types.ObjectId,ref:"Product",required:true},
quantity:{type:Number,required:true},
orderDate:{type:Date, default:Date.now,required:true}
})

const orderModal=mongoose.model("Orders",orderSchema)
export default orderModal