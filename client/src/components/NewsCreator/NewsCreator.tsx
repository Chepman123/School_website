import { useState } from 'react';
import classes from './NewsCreator.module.scss';
export default function NewsCreator(){
    const[title,setTitle] = useState<string>('');
    const[content,setContent] = useState<string>('');
    const[file,setFile] = useState<File|null>();
    return <main className={classes.main}>
        <h1>Створи новину!</h1>
        <input type='text' value={title} onChange={(e)=>setTitle(e.target.value)} placeholder='Титул...'/>
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
    <button>Створити новину</button>
    </main>
}