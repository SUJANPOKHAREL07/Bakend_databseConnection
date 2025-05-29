//router code

import { Router } from "express";
import { createProduct, deleteProduct, getAllProducts, getProductsById,  updateProductController} from "../controller/productController";
const productRouter=Router()
const categoryRouter=Router()

//  Product Router
productRouter.get("/",getAllProducts)
productRouter.get("/:id",getProductsById)
productRouter.post("/",createProduct)
productRouter.put("/:id",updateProductController)
productRouter.delete("/:id",deleteProduct)
export default productRouter


