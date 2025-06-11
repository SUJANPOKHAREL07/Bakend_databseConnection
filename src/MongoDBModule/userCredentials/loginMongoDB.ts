import  { Schema } from "mongoose";
import mongoose from "../mogodbClient"
const userLoginCheck=new Schema({
    name:{type:String,require:true},
    passwowrd:{type:String,require:true}
})
const userLogin=mongoose.model("UserLogin",userLoginCheck)
export default userLogin