import { error } from 'console'
import {sign,verify} from 'jsonwebtoken'
import dotenv from "dotenv"
dotenv.config()
export type Tokenload={
    email:string
}
const EXPIRY_TIME_IN_SECONDS=500
const jwtSceret = process.env.JWT_SECRET || ""
if(!jwtSceret){
    throw new Error("Please set JWT Scerete")
}

export function generateToken(loadToken:Tokenload){
    const token = sign(loadToken,jwtSceret,{

        expiresIn:EXPIRY_TIME_IN_SECONDS
    })
    return token
}

export function verifyToken(token:string):Tokenload{
    const checkToken=verify(token,jwtSceret)
    console.log("Validate:",checkToken)
    return checkToken as Tokenload
}