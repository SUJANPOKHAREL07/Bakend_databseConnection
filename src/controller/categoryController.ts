import { Request,Response } from "express";
import { sqlCategoryModal } from "../sql-models/categorySQLmodal";
export const getAllCategoryController=async(req:Request,res:Response)=>{
    try{
        const categories=await sqlCategoryModal.getAllCategory()
        res.status(200).json(categories)
    }
    catch(error){
        res.status(404).json({error:"Error to fetch data "})
    }
}
export const getCategoryByIDController=async(req:Request,res:Response)=>{
    const id=Number(req.params.id)
    const category=await sqlCategoryModal.getCatgoryById(id)
    console.log(category)
    res.status(200).json(category)
}

export const createCategory=async(req:Request,res:Response)=>{
    const{name}=req.body;
    const newCategory=await sqlCategoryModal.createCategory({name})
    console.log(newCategory)
    res.json(newCategory)

}
export const updateCategoryController=async(req:Request,res:Response)=>{
    const id = Number(req.params.id);
    const{name}=req.body;
    const updateCategory=await sqlCategoryModal.updateCategory(id,{
        name
    })
    res.status(200).json(updateCategory)
}
export const deleteCategoryController=async(req:Request,res:Response)=>{
    const id=Number(req.params.id);
   const deleted= await sqlCategoryModal.deleteCategory(id)
    res.status(200).json(deleted)
}
