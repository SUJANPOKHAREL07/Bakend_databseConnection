// controller code

import { Request,Response } from "express";
import { productModal } from "../modal/productModal";
import { sqlProductModal } from "../sql-models/productSQLmodal";
import { error } from "console";
import {  creatProductsService, deleteProductService, getAllProductsService, getProdcutsByIDService, updateProductService } from "../MongoDBModule/productModal/productService";


export const getAllProducts = async (req: Request, res: Response) => {
    try {
        const products = await getAllProductsService();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: "Error fetching products" });
    }
};
export const getProductsById = async (req: Request, res: Response) => {
    try {
       
        const products = await getProdcutsByIDService(req.params.id);
       console.log(products)
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: "Error fetching products" });
    }
};
export const createProduct=async(req:Request,res:Response)=>{
try{
    const{name,price,categoryID}=req.body
   const newProduct=await creatProductsService(name,price,categoryID)
   console.log(newProduct)
   res.json(newProduct)
}catch(error){
  res.status(404).json({error:"unable to create products"})
}
 
}
// export const updateProduct=async (req:Request,res:Response)=>{
//     const id=Number(req.params.id)
//     console.log(req.params,id)

//     const{name,price,categoryid}=req.body
//     console.log(req.body)
//     const updated=await sqlProductModal.updateProductSQL(id,{name,price,categoryid,})
//     if (updated === undefined) {
//       return res.status(400).json({ error: "No fields provided for update" });
//     }
//     console.log("thi is updated:controller",updated)
//     console.log(req.body)
//    res.status(404).json({error:"controler:unable to updated"})
   
//     res.status(202).json(updated)
//}
export const updateProductController = async (req: Request, res: Response) => {
  const id = req.params.id;
  const { name, price, categoryID } = req.body;

  try {
    const productid = await updateProductService({id:id,name,price,categoryID});
    const newUpdatedData=await getProdcutsByIDService(id)
    res.json(newUpdatedData)
    // const newUpdatedData={...product,...req.body}
    // res.status(200).json(newUpdatedData);
    console.log(productid)
  } catch (error: any) {
    console.error("Update error:", error.message || error);
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
 
};
 export const deleteProduct=async(req:Request,res:Response)=>{
    // const id=Number(req.params.id)
    await deleteProductService(req.params.id)
    res.status(200).json({message:"Deleted"})
  }