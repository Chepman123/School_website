import db from "../db";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
type RegLogResult = "username" | "password" | null;
export default class RegLogServ{
    async Login(username:string,password:string):Promise<{result:RegLogResult,token:string}>{
        let sql:string = "SELECT password FROM users WHERE login = $1";


        const result = (await db.query(sql,[username])).rows;
        if(result){
        if(await bcrypt.compare(password,result[0].password)){
            sql = "SELECT role FROM users WHERE login = $1";
            const role:string = (await db.query(sql,[username])).rows[0].role;
            const token:string = jwt.sign({username:username,role:role},process.env.SECRET!,{expiresIn:'7d'});
           return {result:null,token:token};
        }
        else return {result:"password",token:""};
        }
         else return {result:"username",token:""};
    }
}