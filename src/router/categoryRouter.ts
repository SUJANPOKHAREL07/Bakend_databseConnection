import { Router } from "express"

import { createCategory, deleteCategoryController, getAllCategoryController, getCategoryByIDController, updateCategoryController } from "../controller/categoryController"

const categoryRouter=Router()

categoryRouter.get("/",getAllCategoryController)
categoryRouter.get("/:id",getCategoryByIDController)
categoryRouter.post("/",createCategory)
categoryRouter.put("/:id",updateCategoryController)
categoryRouter.delete("/:id",deleteCategoryController)
export default categoryRouter