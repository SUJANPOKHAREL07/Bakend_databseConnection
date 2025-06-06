import { Schema } from "mongoose";
import mongoose from "../mogodbClient";
import { ref } from "process";

const productSchema=new Schema({
    name:{type:String,require:true},
    price:{type:Number,require:true},
    categoryID:{type:mongoose.Types.ObjectId,ref:"Category",require:true}
})
const productModal=mongoose.model("Product",productSchema)

export default productModal