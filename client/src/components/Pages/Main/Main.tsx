import { useEffect, useState } from "react";
import Header from "../../Header/Header";
import Nav from "../../Nav/Nav";
import classes from './Main.module.scss'
import News from "../../News/News";
import type Inews from "../../../interfaces/news";
import { Link } from "react-router-dom";
export default function Main(){
  const[news,setNews] = useState<Inews[]>([]);
  async function GetNews() {
    const response = await fetch('http://localhost:5000');
    const result = await response.json();
    setNews(result);
  }
  useEffect(()=>{
     GetNews();
  },[])
    return <>
    <Nav/>
    <Header/>
    <div className={classes.div}>
    <h3>Комунальний заклад "Ліцей №2 Козятинської міської ради Вінницької області" з великою радістю відкриває вам дорогу у світ знань!

  Наш ліцей– це не лише знання та виховання, а й комфорт та умови, в яких знання й виховання будуть засвоєні найкраще.</h3>
     
    </div >
    <Link className={classes.a} to={'News'}>Що нового:</Link>
    <div className={classes.news}>
      
    {news.map((newsData)=>{
      return <News data={newsData}/>
    })}
    </div>
    </>
}