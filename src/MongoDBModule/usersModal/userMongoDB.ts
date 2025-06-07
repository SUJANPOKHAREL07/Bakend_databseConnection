import { Schema } from "mongoose";
import mongoose from "../mogodbClient";
import { time } from "console";
const userSchema=new Schema({
    name:{type:String,require:true},
    email:{type:String,require:true,unique:true},
    password:{type:String,require:true,minlength:8},
    createAt:{type:Date,default:Date.now}
})

const userModal=mongoose.model("Users",userSchema)

export default userModal
