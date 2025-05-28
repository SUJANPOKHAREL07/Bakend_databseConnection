import { createCategory } from "../controller/categoryController";
import pool from "./mysql-client";
export const sqlCategoryModal = {
  async getAllCategory() {
    const [cate] = await pool.query("select * from categories");
    return cate;
  },
  async getCatgoryById(id: number) {
    const [cate] = await pool.query("select * from categories where id=?", [
      id,
    ]);
    return Array.isArray(cate) && cate.length ? cate[0] : undefined;
  },
  async createCategory(category: { name: string }) {
    const [cate]: any = await pool.query(
      "insert into categories(name)values(?)",
      [category.name]
    );
    console.log(cate)
    return {
      id: cate.insertId,
      ...category,
    };
  },
  async updateCategory(id:number,category:{name?:string}){
    const updateCategorys={
        name:category.name
    }
    console.log(updateCategorys)
    await pool.query("update categories set name=? where id=?",[category.name,id])
    return updateCategorys
  },
  async deleteCategory(id:number){
   const [cat]:any=await pool.query("delete from categories where id=?",[id])
   
  }
};
