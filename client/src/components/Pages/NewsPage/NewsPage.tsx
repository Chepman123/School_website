import { useParams } from "react-router-dom";
import Header from "../../Header/Header";
import { useEffect, useState } from "react";
import type Inews from "../../../interfaces/news";
import classes from './NewsPage.module.scss';
export default function(){
   const { id } = useParams();
   const[data,setData] = useState<Inews>();
   const[admin,setAdmin] = useState<boolean>(false);
   const GetData = async()=>{
    let response = await fetch(`http://localhost:5000/news/${id}`);
    setData(await response.json());

     response = await fetch('http://localhost:5000/header',{
            method:'GET',
            credentials:'include'
        });
        const result:{admin:boolean,username:string} = await response.json();
        setAdmin(result.admin);
   }
   const Delete = ()=>{
      const response =  fetch(`http://localhost:5000/news/${id}`,{method:'DELETE',credentials:'include'});
   }
   useEffect(()=>{
      GetData();
   },[])
    return <>
    <Header/>
    <aside className={classes.aside}>
    <img src={data?.image}/>
    <div>
    <h1>{data?.title}</h1>
<h3 className={classes.h3}>
    {data?.created_at
        ? new Date(data.created_at).toLocaleDateString("uk-UA")
        : ""}
</h3>
{admin&&<>
        <h3 className={classes.h3}>{data?.created_by}</h3>
        <button onClick={Delete}className={classes.button}>Видалити новину</button>
        </>}

    </div>
    </aside>
    <p className={classes.p}>{data?.content}</p>
    </>
}