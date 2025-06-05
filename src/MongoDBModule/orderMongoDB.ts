import mongoose, { Schema } from "mongoose";


const orderSchema=new Schema({
userId:{type:mongoose.Types.ObjectId,ref:"User",require:true},
productId:{type:mongoose.Types.ObjectId,ref:"Product",require:true},
price:{type:Number,require:true}
})

const order=mongoose.model("Orders",orderSchema)
export default order