import {Request,Response, Router } from "express"
import GradeBookService from "../Services/GradeBook";
import GradeBookController from "../Controllers/GradeBook";
import IsTeacher from "../Middleware/IsTeacher";

export default ()=>{
    const router:Router = Router();

    const service:GradeBookService = new GradeBookService();
    const controller:GradeBookController = new GradeBookController(service);

    router.get('/header',IsTeacher,(req:Request,res:Response)=>controller.GetDataHeader(req,res));
    router.get('/',IsTeacher,(req:Request,res:Response)=>controller.GetData(req,res));
    router.post('/',IsTeacher,(req:Request,res:Response)=>controller.AddData(req,res));
    router.patch('/',IsTeacher,(req:Request,res:Response)=>controller.ChangeData(req,res));

    return router;
}