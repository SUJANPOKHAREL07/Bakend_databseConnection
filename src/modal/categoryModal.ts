import { createCategory } from "../controller/categoryController"
import Product from "./productModal"

export interface Category{
    id:number,
    name:string
}

const categorys:Category[]=[]
 
export const getAllCategory={
    getAll():Category[]{
        return categorys
    },
    getCategoryByID(id:number):Category | undefined{
        return categorys.find((c)=>c.id===id)
    },
  
    createCategory(input:Omit<Category,"id">):Category{
        const newCategory:Category={
            id:categorys.length+1,
            ...input
        }
        categorys.push(newCategory)
        return newCategory
    }
}