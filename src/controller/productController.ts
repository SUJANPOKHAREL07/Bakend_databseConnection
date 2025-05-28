// controller code

import { Request,Response } from "express";
import { productModal } from "../modal/productModal";
import { sqlProductModal } from "../sql-models/productSQLmodal";
import { error } from "console";

export const getAllProducts = async (req: Request, res: Response) => {
    try {
        const products = await sqlProductModal.getAll();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: "Error fetching products" });
    }
};
export const getProductsById = async (req: Request, res: Response) => {
    try {
        const id=Number(req.params.id)
        const products = await sqlProductModal.getById(id);
       console.log(products)
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: "Error fetching products" });
    }
};
export const createProduct=async(req:Request,res:Response)=>{
   const{name,price,categoryid}=req.body;
   const newProduct=await sqlProductModal.createProductSQL({name,price,categoryid})
   res.json(newProduct)
 
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
  const id = parseInt(req.params.id);
  const { name, price, categoryId } = req.body;

  try {
    const updatedProduct = await sqlProductModal.Updated(id, {
      name,
      price,
      categoryId,
    });
    res.status(200).json(updatedProduct);
  } catch (error: any) {
    console.error("Update error:", error.message || error);
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
 
};
 export const deleteProduct=async(req:Request,res:Response)=>{
    const id=Number(req.params.id)
    await sqlProductModal.deleteProduct(id)
    res.status(200).json({message:"Deleted"})

  }