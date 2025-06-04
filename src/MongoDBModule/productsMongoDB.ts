
import mongoose, { Schema } from "mongoose";

const productSchema = new Schema({
    name:{type:String, require:true,},
    price:{type:Number,rquire:true},
    categoryId:{type:Number,require:true},

})
const Product=mongoose.model("Product",productSchema)
export default Product