import { Request, Response } from "express";
import ProfileService from "../Services/Profile";

export default class ProfileController{
    constructor(private service:ProfileService){}

    async GetData(req:Request,res:Response){
         const result = await this.service.GetData(req.params.username);
        res.json(result);
    }
    async ChangeProfile(req:Request,res:Response){
        this.service.ChangeProfile(req.params.username,req.body.description,req.body.avatar);
    }
}