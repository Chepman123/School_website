import { Request, Response, Router } from "express";
import AdminService from "../Services/AdminPanel";
import AdminController from "../Controllers/AdminPanel";
import IsAdmin from "../Middleware/IsAdmin";

export default function(){
   const router:Router = Router();

  const service:AdminService = new AdminService();
  const controller:AdminController = new AdminController(service);

  router.post('/news',IsAdmin,(req:Request,res:Response)=>controller.SendNews(req,res));
  router.post('/profile',IsAdmin,(req:Request,res:Response)=>controller.CreateUser(req,res));
    router.get('/',(req:Request,res:Response)=>controller.GetClasses(req,res));

   return router;
}