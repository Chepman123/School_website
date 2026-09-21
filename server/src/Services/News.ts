import Inews from "../Interfaces/news";
import db from '../db';
export default class NewsService{

    async GetNews(id:string):Promise<Inews>{
       const sql:string = `SELECT n.id, CONCAT(u.first_name,' ',u.second_name) as created_by,content as content,image,title,created_at FROM news n
JOIN users u ON n.created_by = u.id 
WHERE n.id = $1`;
       const result:Inews = (await db.query(sql,[id])).rows[0];

       return result;
    }
    async GetAllNews(page:string):Promise<{news:Inews[],count:number}>{
        const sql:string = `SELECT *,COUNT(*) AS total_count FROM news GROUP BY id ORDER BY created_at DESC OFFSET($1-1)*18 LIMIT 18`;

        const result = (await db.query(sql,[page])).rows;

        return {news:result,count:result[0].total_count};
    }
    async DeleteNews(id:string){
       const sql:string = 'DELETE FROM news WHERE id = $1';
       db.query(sql,[id]);
    }
}