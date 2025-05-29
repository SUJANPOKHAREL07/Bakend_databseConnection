import pool from "./mysql-client";
export const sqlOrderModal={
    async getAllOrder(){
       
        const [orderData]= await pool.query("select * from orders")
        return orderData
    },
    async getOrderById(id:number){
      const [orderData]=  await pool.query("select * from orders where id =?",[id])
        return orderData
    },
    async createOrder(userid:number){
        await pool.query("insert into orders (userid) values (?)",[userid])
        console.log(userid)
    }

}
