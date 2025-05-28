import pool from "./mysql-client";
export const sqlUserModal={
    async getAllUser(){
        const [userData]=await pool.query("select * from users")
        return userData
    },
    async getUserBYId(id:number){
        const [userData]=await pool.query("select * from users where id=?",[id])
        return userData
    },
    async createUser(user:{name:string,email:string}){
        const data=await pool.query("insert into users (name,email) values (?,?)",[user.name,user.email])
        
    },
}