import { Request,Response } from "express";
import { sqlCategoryModal } from "../sql-models/categorySQLmodal";
import { createCategoryService, deleteCategoryService, getAllCategoryService, getCategoryByIdSevice, updateCategoryService } from "../MongoDBModule/category/categoryService";
import { log } from "console";
export const getAllCategoryController=async(req:Request,res:Response)=>{
    try{
        const categories=await getAllCategoryService()
        res.status(200).json(categories)
    }
    catch(error){
        res.status(404).json({error:"Error to fetch data "})
    }
}
export const getCategoryByIDController=async(req:Request,res:Response)=>{
   
    const category=await getCategoryByIdSevice(req.params.id)

    console.log(category)
    res.status(200).json(category)
}

export const createCategory=async(req:Request,res:Response)=>{
    try{
        const {name}=req.body
        console.log({name})
        const newCategory=await createCategoryService(name)
    
    res.json(newCategory)

    }
    catch(error){
        console.log("controller error:",error)
    }
}
export const updateCategoryController=async(req:Request,res:Response)=>{
    // const{name,productId}=req.body;
    
    try{
        const id =Number( req.params.id);
       const {name}=req.body
     const updateCategory=await updateCategoryService({id,name})
    console.log("this is updateController",updateCategory)
      if (!updateCategory) {
    res.status(404).json({ message: "Category not found" });
    return;
  }
    res.status(200).json(updateCategory)
   }
   catch{
    res.json("unaable to update")
   }
}
export const deleteCategoryController=async(req:Request,res:Response)=>{
   
   await deleteCategoryService(req.params.id)
    res.status(200).json("successfuly deleted the category")
}
