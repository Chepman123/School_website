import { Request, Response, Router } from "express"
import NewsService from "../Services/News";
import NewsController from "../Controllers/News";
import IsAdmin from "../Middleware/IsAdmin";

export default ()=>{
    const router:Router = Router();

    const service:NewsService = new NewsService();
    const controller:NewsController = new NewsController(service);


    router.get('/:id',(req:Request,res:Response)=>controller.GetNews(req,res));
    router.get('/',(req:Request,res:Response)=>controller.GetAllNews(req,res));
    router.delete('/:id',IsAdmin,(req:Request,res:Response)=>controller.DeleteNews(req,res));

    return router;
}