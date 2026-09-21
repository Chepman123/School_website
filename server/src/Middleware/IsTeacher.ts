import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
export default async function(req:Request,res:Response,next:NextFunction){

    const token:string = req.cookies.token;

    const decoded:{role:string,username:string} = (await jwt.verify(token,process.env.SECRET!)) as {role:string,username:string};

    if(decoded.role!='teacher') return;

    next();
}