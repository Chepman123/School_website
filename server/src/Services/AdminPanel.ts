import jwt from 'jsonwebtoken';
import db from '../db';
import bcrypt from 'bcrypt';

export default class AdminService{
    async SendNews(title:string,content:string,file:string,token:string){
      const decoded = (await jwt.verify(token,process.env.SECRET!) as {role:string,username:string}).username;

      let sql:string = 'SELECT id FROM users WHERE login = $1';
      const id = (await db.query(sql,[decoded])).rows[0].id;
      
      sql = 'INSERT INTO news(created_by,created_at,content, image,title) VALUES($1,$2,$3,$4,$5)';
      await db.query(sql,[id,new Date(),content,file,title]);
       
    }
    async CreateUser(firstName:string,secondName:string,phone:string,password:string,role:string,login:string,studentClass:number){
        const hashedPassword:string = await bcrypt.hash(password,10);

        const sql:string = 'INSERT INTO users(first_name,second_name,password,login,role,phone,class_id) VALUES($1,$2,$3,$4,$5,$6,$7)';

        db.query(sql,[firstName,secondName,password,login,role,phone,studentClass]);
    }
    async GetClasses():Promise<{id:number,title:string}[]>{
      const sql:string = 'SELECT * FROM classes';

      const result = (await db.query(sql)).rows;

      return result;
    }
}