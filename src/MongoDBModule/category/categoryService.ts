import { idText } from "typescript";
import Category from "./categoryMongoDB";

async function createCategoryService(name: string) {
  const category = new Category({ name: name });
  return await category.save();
}
async function getAllCategoryService() {
  return await Category.find();
}
async function getCategoryByIdSevice(id:String){
  const getBYID=await Category.findById(id)
  return getBYID
}
async function updateCategoryService(data:{id:number,name:string}){
  const updateFields:any={}
  if(data.name!==undefined) updateFields.name=data.name
  const updateData= await Category.findByIdAndUpdate(
    {_id:data.id},
  { $set:updateFields},{
    new:true
  }
  )
  console.log("update service ",updateData)
  return updateData
} 
async function deleteCategoryService(id:string){
  const deleteCategory=await Category.deleteOne({_id:id});
  return deleteCategory
}
export { createCategoryService, getAllCategoryService,getCategoryByIdSevice,updateCategoryService,deleteCategoryService };
