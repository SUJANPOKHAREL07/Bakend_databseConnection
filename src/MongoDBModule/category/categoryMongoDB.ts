import  { Schema } from "mongoose";
import mongoose from '../mogodbClient'

const categorySchema=new Schema({
    name:{type:String,require:true},
})
const Category=mongoose.model("Category",categorySchema)

export default Category