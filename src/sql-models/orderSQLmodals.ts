

import pool from "./mysql-client";
import { sqlProductModal } from "./productSQLmodal";


export const sqlOrderModal = {
 
  async createOrder(order:{userId:number,productId:number[]}){

    const conn =await pool.getConnection()
    try{

await conn.beginTransaction();


      const [result]: any = await conn.query(
        "INSERT INTO orders (userId) VALUES (?)",
        [order.userId]
      );
      const orderId = result.insertId;
      for (const pid of order.productId) {
        await conn.query(
          "INSERT INTO order_products (orderid, productId) VALUES (?, ?)",
          [orderId, pid]
        );
      }
      await conn.commit();
      return {
        id: orderId,
        userId: order.userId,
        productId: order.productId,
      };
    }catch(err){
        await conn.rollback();
      throw err;
    }
    finally{
      conn.release()
    }
  },
 
  async getAllOrdder(){

  }
};
