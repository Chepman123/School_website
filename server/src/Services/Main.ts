import jwt from 'jsonwebtoken';
import db from '../db';
export default class MainService{
    async GetHeader(token:string):Promise<{admin:boolean,username:string,isTeacher:boolean}> {
        const decoded:{username:string,role:string} = (await jwt.verify(token,process.env.SECRET!)) as {username:string,role:string};
        const role:boolean = decoded.role=='admin';
        const sql:string = `SELECT CONCAT(first_name,' ',second_name) as username FROM users
        WHERE login = $1`;
        const result = await db.query(sql,[decoded.username]);
        return {admin:role,username:result.rows[0].username,isTeacher:decoded.role=='teacher'};
    }
    async GetNews(){
        const sql:string = 'SELECT id,Left(content,200) as content,image,title FROM news ORDER BY created_at DESC LIMIT 12';

        return (await db.query(sql)).rows;
    }
}