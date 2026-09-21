import jwt from 'jsonwebtoken';
import db from '../db';
interface ClassData{
    id:string,
    title:string
}
interface Subject{
    id:string,
    title:string
}
export default class GradeBookService{
   async GetHeaderData(token:string):Promise<{class:ClassData[],subjects:Subject[]}>{
        let sql:string = `SELECT s.title,s.id FROM teachers t
JOIN subjects s ON t.subject_id = s.id
JOIN users u ON u.id = t.teacher_id
WHERE login = $1
`;
    const decoded:{role:string,username:string} = (await jwt.verify(token,process.env.SECRET!)) as {role:string,username:string};
    let query = await db.query(sql,[decoded.username]);
    let result:{class:ClassData[],subjects:Subject[]} = {class:[],subjects:query.rows};

    sql = `SELECT * FROM classes`;

    query = await db.query(sql);
    result.class = query.rows;

    return result;
}
    async GetData(classData:string,subject:string){
   const sql:string = `SELECT CONCAT(u.first_name,' ',u.second_name) AS username,g.value,g.date,g.id FROM grades g
JOIN users u ON g.student_id = u.id
WHERE u.class_id = $1 AND g.subject_id = $2
`;
   const result = await db.query(sql,[classData,subject]);
   return result.rows;
}
async AddGrade( username:string,date: string,value:string, subjectId: string){
     let sql:string = `SELECT id FROM users WHERE CONCAT(first_name,' ',second_name) = $1`;
     let result = (await db.query(sql,[username])).rows[0];
     const id = result.id;
     sql = `INSERT INTO grades(student_id,subject_id,value,date) VALUES($1,$2,$3,$4)`

     await db.query(sql,[id,subjectId,value,date]);
}
async ChangeGrade(id:string,value:string){
    const sql:string = `UPDATE grades SET value = $1 WHERE id = $2`;

    await db.query(sql,[value,id]);
}
}