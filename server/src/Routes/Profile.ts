import { Request, Response, Router } from "express"
import ProfileService from "../Services/Profile";
import ProfileController from "../Controllers/Profile";
import UsersProfile from "../Middleware/UsersProfile";

export default ()=>{
    const router:Router = Router();

    const service:ProfileService = new ProfileService();
    const controller:ProfileController = new ProfileController(service);

    router.get('/:username',UsersProfile,(req:Request,res:Response)=>controller.GetData(req,res));
    router.put('/:username',UsersProfile,(req:Request,res:Response)=>controller.ChangeProfile(req,res));

    return router;
}