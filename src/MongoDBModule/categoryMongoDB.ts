import mongoose, { Schema } from "mongoose";

const categorySchema=new Schema({
    name:{type:String,require:true}

})
const Catrgory=mongoose.model("Category",categorySchema)
export default Catrgory