
// product sql code

import pool from "./mysql-client";

export const sqlProductModal={
    async getAll(){
        const [data]=await pool.query("select * from products")
        return data
    },
    async getById(id:number){
        const[data]=await pool.query("select * from products where id=?",[id])
        return Array.isArray(data) && data.length ? data[0]:undefined
    },
    async createProductSQL(products:{name:string,price:number,categoryid:number}){
        const [data]:any =await pool.query("insert into products(name,price,categoryId)values(?,?,?)",[products.name,products.price,products.categoryid])
      console.log(data)
        return{
            id:data.insertId,...products
        }
    },
    
     async Updated(
    id: number,
    p0: { name?:string; price?:number;  categoryId?: number; }
  ) {
    try {
      console.log("Checking if product exists with id:", id);
      const [rows] = await pool.query<any[]>(
        "SELECT * FROM products WHERE id = ?",
        [id]
      );

      if (rows.length === 0) {
        throw new Error(`Product with id ${id} not found`);
      }

      const updatedProduct = {
        ...rows[0],
        name: p0.name,
        price: p0.price,
       categoryId: p0.categoryId,
      };

      console.log("Updating product with data:", updatedProduct);

      await pool.query(
        "UPDATE products SET name=?, price=?, categoryId=? WHERE id = ?",
        [p0.name, p0.price, p0.categoryId, id]
      );

      console.log(`Product with id ${id} updated successfully`);

      return updatedProduct;
    } catch (error) {
      console.error("SQL error:", error);
      throw error;
    }
  },
  async deleteProduct(id:number){
    await pool.query("delete from products where id=?",[id])
    
  }
}


