import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../Header/Header";
import classes from './AdminPanel.module.scss';
import ProfileCreator from "../../ProfileCreator/ProfileCreator";
import NewsCreator from "../../NewsCreator/NewsCreator";
export default function AdminPanel(){
    const navigate = useNavigate();
    const[profileCreator,setProfile] = useState<boolean>(false);
    async function GetData() {
            const response = await fetch('http://localhost:5000/header',{
                method:'GET',
                credentials:'include'
            });
            const result:{admin:boolean,username:string} = await response.json();
            if(!result.admin) navigate('/');
        }
        useEffect(()=>{
            GetData();
        },[])
    return <>
    <Header/>
    <div className={classes.div}>
    <button className={profileCreator?classes.button:classes.activButton} onClick={()=>setProfile(false)}>Створити новину</button>
    <button className={!profileCreator?classes.button:classes.activButton} onClick={()=>setProfile(true)}>Створити користувача</button>
    </div>
    {profileCreator&& <ProfileCreator/>}
    {!profileCreator&& <NewsCreator/>}
    </>
}