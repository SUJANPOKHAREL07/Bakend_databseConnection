import mongoose, { Schema } from "mongoose";

const categorySchema=new Schema({
    name:{type:String,require:true},
    productId:{type:mongoose.Types.ObjectId,ref:"Products",require:true},
    

})
const Catrgory=mongoose.model("Category",categorySchema)
export default Catrgory