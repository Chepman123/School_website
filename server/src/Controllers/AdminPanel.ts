import { Response,Request } from "express";
import AdminService from "../Services/AdminPanel";

export default class AdminController{
    constructor(private service:AdminService){}

    async SendNews(req:Request,res:Response){
         this.service.SendNews(req.body.title,req.body.content,req.body.file,req.cookies.token);
    }
    async CreateUser(req:Request,res:Response){
        this.service.CreateUser(req.body.firstName,req.body.secondName,req.body.phone,req.body.password,req.body.role,req.body.login,req.body.studentClass);
    }
    async GetClasses(req:Request,res:Response){
        res.json(await this.service.GetClasses());
    }
}