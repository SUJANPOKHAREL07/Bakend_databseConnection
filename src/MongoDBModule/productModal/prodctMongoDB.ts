import { Schema,Types,Document } from "mongoose";
import mongoose from "../mogodbClient";

export interface Iproduct extends Document{
  name:string,
  price:Number,
  categoryID:Types.ObjectId
}
const productSchema=new Schema<Iproduct>({
    name:{type:String,required:true},
    price:{type:Number,required:true},
    categoryID:{type:Schema.Types.ObjectId,ref:"Category",required:true}
})
const productModal=mongoose.model("Product",productSchema)

export default productModal

