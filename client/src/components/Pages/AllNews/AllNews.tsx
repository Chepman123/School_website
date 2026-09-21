import { useEffect, useState } from "react";
import Header from "../../Header/Header";
import type Inews from "../../../interfaces/news";
import News from "../../News/News";
import classes from './AllNews.module.scss'
export default function AllNews(){
    const[currentPage,setPage] = useState<number>(1);
    const[count,setCount] = useState<number>();
    const[news,setNews] = useState<Inews[]>([]);
    const GetData = async()=>{
        const response = await fetch(`http://localhost:5000/News?page=${currentPage}`);
        const result = await response.json();
        
        setCount(result.count);
        setNews(result.news);
    }
    useEffect(()=>{GetData()},[currentPage])
    return<><Header/>
     <main className={classes.main}>
    
    {news.map((data)=>{
        return <News data={data}/>
    })}
    </main>
    <div className={classes.div}>{currentPage!=1&&
        <button onClick={()=>{window.scrollTo({
    top: 0,
    behavior: "smooth"
}); setPage(currentPage-1)}}>{'<'}</button>}
        <h1>{currentPage}</h1>{currentPage!=count!/18&&
        <button onClick={()=>{window.scrollTo({
    top: 0,
    behavior: "smooth"
}); setPage(currentPage+1)}}>{'>'}</button>}
    </div>
    </>
}