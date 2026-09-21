import db from '../db';
interface profileData{
   username:string,
   login:string,
   phone:string,
   average_grade:string,
   class:string,
   avatar?:string,
   description?:string,
   average_grades:{title:string,value:string}[],
   grades:{title:string,value:string[]}[]
}

export default class ProfileService{
    async GetData(username:string):Promise<profileData>{
      let sql:string = `SELECT CONCAT(u.first_name,' ',u.second_name) as username,login,phone,c.title as class, ROUND(AVG(g.value),1) AS average_grade,description,avatar FROM users u
JOIN classes c ON c.id = u.class_id
JOIN grades g ON g.student_id = u.id
WHERE CONCAT(u.first_name,' ',u.second_name) = $1
GROUP BY u.id,c.title`;

     let result:profileData = (await db.query(sql,[username])).rows[0];

     sql = `SELECT s.title,ROUND(AVG(g.value),1) AS value FROM grades g
JOIN subjects s ON s.id = g.subject_id
JOIN users u ON u.id = g.student_id
WHERE CONCAT(u.first_name,' ',u.second_name) = $1
GROUP BY s.id`;

    result.average_grades = (await db.query(sql,[username])).rows;

   sql = 'SELECT title FROM subjects';

   const subjects:{title:string}[] = (await db.query(sql)).rows;

    sql = `SELECT s.title,g.value FROM grades g
JOIN subjects s ON s.id = g.subject_id
JOIN users u ON u.id = g.student_id
WHERE CONCAT(u.first_name,' ',u.second_name) = $1
`;
result.grades = [];

const grades:{title:string,value:string}[] = (await db.query(sql,[username])).rows;
for(let i=0;i<subjects.length;i++){
    result.grades.push({title:subjects[i].title,value:[]});
    for(let j = 0;j<grades.length;j++){
        if(subjects[i].title == grades[j].title){
           result.grades[i].value.push(grades[j].value);
        }
    }
}
     return result;
    }
    async ChangeProfile(username:string,description:string,avatar:string){
        if(avatar!=null){
           const sql:string = `UPDATE users SET description=$1,avatar=$2
           WHERE CONCAT(first_name,' ',second_name) = $3`;
           db.query(sql,[description,avatar,username]); 
        }
        else{
           const sql:string = `UPDATE users SET description=$1
           WHERE CONCAT(first_name,' ',second_name) = $2`;
           db.query(sql,[description,username]);
        }
    }
}