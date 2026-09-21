import { useEffect, useState } from 'react';
import classes from '../NewsCreator/NewsCreator.module.scss';
export default function ProfileCreator(){
    const[firstName,setfName] = useState<string>('');
    const[secondName,setsName] = useState<string>('');
    const[phone,setPhone] = useState<string>('');
    const[password,setPassword] = useState<string>('');
    const[role,setRole] = useState<'admin'|'student'|'teacher'>('teacher');
    const[login,setLogin] = useState<string>('');
    const[classStudent,setClass] = useState<{id:number,title:string}[]>([]);
    const[studentsClass,setStudent] = useState<number>(0);

    const [status,setStatus] = useState<''|'all fields are required'>('');
    const CreateNews = async()=>{
        if(firstName==''||secondName==''||phone == null||password==''||login==''){
            setStatus('all fields are required');
            return;
        }
     await fetch('http://localhost:5000/AdminPanel/profile',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        credentials:'include',
        body:JSON.stringify({firstName,secondName,phone,password,role,login,studentsClass})
      });
    }
    async function GetData() {
       const response = await fetch('http://localhost:5000/AdminPanel');
       setClass(await response.json()); 
    }
    useEffect(()=>{
       GetData();
    },[])
    return <main className={classes.main}>
        <h1>Створи  користувача!</h1>
        <input type='text' value={firstName} onChange={(e)=>setfName(e.target.value)} placeholder={`Ім'я...`} />
        <input type='text' value={secondName} onChange={(e)=>setsName(e.target.value)} placeholder={`Фамілія...`} />
        <input type='text' value={phone} onChange={(e)=>setPhone(e.target.value)} placeholder={`Номер телефону...`} />
        <input type='password' value={password} onChange={(e)=>setPassword(e.target.value)} placeholder={`Пароль...`} />
        
        <input type='text' value={login} onChange={(e)=>setLogin(e.target.value)} placeholder={`Емеіл...`} />
        <select onChange={(e)=>setRole(e.target.value as 'admin'|'student'|'teacher')}>
            <option value={'teacher'}>Вчитель</option>
            <option value={'student'}>Учень</option>
            <option value={'admin'}>Адмін</option>
        </select>{role == 'student' &&
         <select onChange={(e)=>setStudent(Number(e.target.value))}>
            {classStudent.map((data)=>{
                return <option value={data.id}>{data.title}</option>
            })}
        </select>}
    <p>{status}</p>
    <button onClick={CreateNews}>Створити користувача</button>
    </main>
}