import { Link } from 'react-router-dom'
import classes from './News.module.scss'
export default function News({data}:{data:{title:string,content:string,image:string,id:number}}){
    return <div className={classes.div}>
        <img src={data.image}/>
        <h2>{data.title}</h2>
        <p>{data.content}...</p>
        <Link to={`/news/${data.id}`}>Дізнайся більше</Link>
    </div>
}
