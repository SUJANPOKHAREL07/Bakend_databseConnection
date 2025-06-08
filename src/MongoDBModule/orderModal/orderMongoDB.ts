import  { Schema,Types } from "mongoose";
import mongoose from "../mogodbClient";

export interface IOrder extends Document {
  userId: Types.ObjectId;
  productId: Types.ObjectId[];
  quantity:Number,
  orderDate: Date;
}
const orderSchema=new Schema<IOrder>({
userId:{type:Schema.Types.ObjectId,ref:"Users",required:true},
productId:[{type:Schema.Types.ObjectId,ref:"Product",required:true}],
quantity:{type:Number,required:true},
orderDate:{type:Date, default:Date.now,required:true}
})

const orderModal=mongoose.model("Orders",orderSchema)
export default orderModal