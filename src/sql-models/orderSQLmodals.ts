

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
   const orderData= await pool.query("select * from order_products")

    console.log(orderData)
  return orderData
  },
  async getOrderByID(id:number){
    const orderIddata=await pool.query("select * from order_products where orderId=?",[id])
    return orderIddata
  },
//   async updateOrder(id:number,order:{productId:number[]}){
//     console.log("got order id ",id)
//     console.log(order.productId)
//    if(order.productId==undefined){
//     return "undefined productId"
//    }
//  for(const pid of order.productId){
//   console.log("productId:",pid)
//        const updated=await pool.query("update order_products set productId=? where orderId=?",[pid,id])
//   console.log("this is updated:",updated)
//  }
   
//   },
async updateOrder(id:number,order:{userId:number,productId:number[]}){
   const conn = await pool.getConnection()
  try{
   
if(order.userId==undefined){
      await conn.query("insert into order userId values (?) where id =?",[order.userId,id])

}
if(order.productId!==undefined){
  await conn.query("delete from order_Products where orderId=? ",[id])

  for(const pid of order.productId){
    await conn.query("INSERT INTO order_products (orderid, productId) VALUES (?, ?)",[id,pid])

  }
  await conn.commit()
  return this.getOrderByID(id)
}
  }catch{
    await conn.rollback()
  }
  finally{
    conn.release()
  }
},
  async deleteOrder(id:number){
    const order=await pool.query("delete  from order_Products where orderId=?",[id])
    return order
    
  }
};
