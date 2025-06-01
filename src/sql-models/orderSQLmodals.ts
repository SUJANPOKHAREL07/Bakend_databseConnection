
import pool from "./mysql-client";
import { sqlProductModal } from "./productSQLmodal";


export const sqlOrderModal = {
  async createOrder( order: { id: number; productId: number[] }) {
    const conn = await pool.getConnection();

    try {
      await conn.beginTransaction();
      const productName = await sqlProductModal.getById(order.id);
      
      const [result]: any = await conn.query(
        "insert into orders (userId) values (?)",
        [order.id]
      );
      const orderid = result;
      for (const pid of order.productId) {
        await conn.query(
          "insert into orders (orderid,productid) where orderid(?,?)",
          [orderid, pid]
        );
      }
    } catch (err) {
      conn.rollback();
      throw err;
    } finally {
      conn.release();
    }
  },
};
