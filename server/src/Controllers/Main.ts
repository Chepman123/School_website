import { Request, Response } from "express";
import MainService from "../Services/Main";

export default class MainContoller{
    constructor(private service:MainService){}

    async GetHeader(req:Request,res:Response){
        const result:{admin:boolean,username:string} = await this.service.GetHeader(req.cookies.token);
        res.json(result);
    }
}