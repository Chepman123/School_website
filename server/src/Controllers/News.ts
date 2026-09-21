import { Request, Response } from "express";
import NewsService from "../Services/News";
import Inews from "../Interfaces/news";

export default class NewsController{
    constructor(private service:NewsService){}

    async GetNews(req:Request,res:Response){
        const result:Inews = await this.service.GetNews(req.params.id);
        res.json(result);
    }
    async GetAllNews(req:Request,res:Response){
        const result:{news:Inews[],count:number} = await this.service.GetAllNews(req.query.page as string);
        res.json(result);
    }
    async DeleteNews(req:Request,res:Response){
        this.service.DeleteNews(req.params.id);
    }
}