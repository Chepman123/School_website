import { Request, Response, Router } from "express"
import MainService from "../Services/Main";
import MainContoller from "../Controllers/Main";

export default ()=>{
    const router:Router = Router();

    const service:MainService = new MainService();
    const controller:MainContoller = new MainContoller(service);

    router.get('/header',(req:Request,res:Response)=>controller.GetHeader(req,res));
    router.get('/',(req:Request,res:Response)=>controller.GetNews(req,res));

    return router
}