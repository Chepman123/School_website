import { Request, Response } from "express";
import GradeBookService from "../Services/GradeBook";

export default class GradeBookController{
    constructor(private service:GradeBookService){}

    async GetDataHeader(req:Request,res:Response){
        const result = await this.service.GetHeaderData(req.cookies.token);

        res.json(result);
    }
    async GetData(req:Request,res:Response){
        const result = await this.service.GetData(req.query.class as string,req.query.subject as string);

        res.json(result);
    }
    async AddData(req:Request,res:Response){
        await this.service.AddGrade(req.body.username,req.body.date,req.body.value,req.body.subjectId);
        res.sendStatus(200);
    }
    async ChangeData(req:Request,res:Response){
       await this.service.ChangeGrade(req.body.id,req.body.value);
        res.sendStatus(200);
    }
}