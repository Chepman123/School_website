import { useState } from 'react';
import classes from './NewsCreator.module.scss';
import { useNavigate } from 'react-router-dom';
export default function NewsCreator(){
    const[title,setTitle] = useState<string>('');
    const[content,setContent] = useState<string>('');
    const[file,setFile] = useState<File|null>();
    const navigate = useNavigate();
    const [status,setStatus] = useState<''|'all fields are required'>('');
    let fileData: string | null = null;
    const CreateNews = async()=>{
        if(title==''||content==''||file == null){
            setStatus('all fields are required');
            return;
        }
          if (file instanceof File) {
    fileData = await new Promise<string | null>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject(null);
      reader.readAsDataURL(file);
    });
  }
     await fetch('http://localhost:5000/AdminPanel/news',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        credentials:'include',
        body:JSON.stringify({title:title,content:content,file:fileData})
      });
      navigate('/AdminPanel');
    }
    return <main className={classes.main}>
        <h1>Створи новину!</h1>
        <input type='text' value={title} onChange={(e)=>setTitle(e.target.value)} placeholder='Титул...' />
        <textarea value={content} onChange={(e)=>setContent(e.target.value)} placeholder='Новина...'/>
            <label htmlFor='photoNews'>Фото</label>
            <input type='file' id='photoNews' onChange={((e)=>{
        const result = e.target.files?.[0]? e.target.files?.[0]:null;
        setFile(result)
    })}
    style={{display:'none'}}/>
    {file&&
    <>
    <img src={URL.createObjectURL(file)} onClick={()=>setFile(null)}/>
    <h2 className={classes.h2}>X</h2>
    </>}
    <p>{status}</p>
    <button onClick={CreateNews}>Створити новину</button>
    </main>
}