import pool from "./mysql-client";
export const sqlOrderModal={
    async getAllOrder(){
       
        const [orderData]= await pool.query("select * from orders")
        return orderData
    }

}
