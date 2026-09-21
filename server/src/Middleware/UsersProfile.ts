import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import db from '../db'
export default async function UsersProfile(req:Request,res:Response,next:NextFunction){

    const username:string = req.params.username;

    const token:string = req.cookies.token;

    const decoded:{role:string,username:string} = (await jwt.verify(token,process.env.SECRET!)) as {role:string,username:string};

    if(decoded.role!='admin'){
       const sql:string = `SELECT CONCAT(first_name,' ',second_name) AS username FROM users 
       WHERE login = $1`;
       const result = (await db.query(sql,[decoded.username])).rows[0].username;
       if(username!=result)return;
    }

    next();
}