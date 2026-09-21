import { useParams } from "react-router-dom";
import Header from "../../Header/Header";
import classes from './Profile.module.scss';
import { useEffect, useState } from "react";

interface profileData {
    username: string,
    login: string,
    phone: string,
    average_grade: string,
    class: string,
    avatar?: string,
    description?: string,
    average_grades: { title: string, value: string }[],
    grades: { title: string, value: string[] }[]
}

export default function Profile() {
    const { username } = useParams();
    const [data, setData] = useState<profileData>();
    const[editMode,setMode] = useState<boolean>(false);
    const[file,setFile] = useState<File>();
    async function GetData() {
        const response = await fetch(`http://localhost:5000/profile/${username}`,{credentials:'include'});
        const result = await response.json();
        setData(result);
    }
    async function Submit() {
        let fileData: string | null = null;
        if (file instanceof File) {
    fileData = await new Promise<string | null>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject(null);
      reader.readAsDataURL(file);
    });
    } 
  setData(prev =>
    prev
        ? { ...prev, avatar: fileData ?? undefined }
        : undefined
);
 await fetch(`http://localhost:5000/profile/${username}`,
    {method:'PUT',
        headers:{'Content-Type':'application/json'},
        credentials:'include',
        body:JSON.stringify({description:data?.description,avatar:fileData})
    }
 );
}
    useEffect(() => {
        GetData();
    }, []);

    return (
        <>
            <Header />

            <main className={classes.profile}>
                {editMode&&
                <section className={classes.profileCard}>
                
                    <div className={classes.avatar}>
                        
                        <label htmlFor="fileProfile">
                            <span className={classes.span}>
                                📷
                            </span>
                            </label>
                            <input type="file" id="fileProfile" style={{display:"none"}} onChange={(e)=>setFile(e.target.files?.[0])}/>
                        
                    </div>

                    <div className={classes.info}>
                        <textarea value={data?.description} onChange={(e) =>
    setData(prev =>
        prev
            ? {
                ...prev,
                description: e.target.value
            }
            : undefined
    )
}className={classes.textarea} placeholder="Опис..."/>
                    </div>
                      <button className={classes.button} onClick={()=>{setMode(false);Submit();}}>Збережи</button>
                </section>
}
                {!editMode&&
                <section className={classes.profileCard}>
                
                    <div className={classes.avatar}>
                        {data?.avatar ? (
                            <img src={data.avatar} alt="Аватар" />
                        ) : (
                            <span>
                                {data?.username?.[0]}
                            </span>
                        )}
                    </div>

                    <div className={classes.info}>
                        <h1>
                            {data?.username}
                        </h1>

                        <p className={classes.username}>
                            @{data?.login}
                        </p>

                        {data?.description && (
                            <p className={classes.description}>
                                {data.description}
                            </p>
                        )}
                    </div>
                      <button className={classes.button} onClick={()=>setMode(true)}>Едитуй</button>
                </section>
}
                <section className={classes.details}>

                    <div className={classes.detail}>
                        <span>Клас</span>
                        <strong>{data?.class}</strong>
                    </div>

                    <div className={classes.detail}>
                        <span>Номер телефону</span>
                        <strong>{data?.phone}</strong>
                    </div>

                    <div className={classes.detail}>
                        <span>Середня оцінка</span>
                        <strong>{data?.average_grade}</strong>
                    </div>

                </section>

                {data?.average_grades && (
                    <section className={classes.grades}>
                        <h2>Середні оцінки</h2>

                        <div className={classes.gradesList}>
                            {data.average_grades.map((grade) => (
                                <div
                                    className={classes.grade}
                                    key={grade.title}
                                >
                                    <span>{grade.title}</span>
                                    <strong>{grade.value}</strong>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {data?.grades && (
                    <section className={classes.grades}>
                        <h2>Оцінки</h2>

                        <div className={classes.subjects}>
                            {data.grades.map((subject) => (
                                <div
                                    className={classes.subject}
                                    key={subject.title}
                                >
                                    <h3>{subject.title}</h3>

                                    <div className={classes.values}>
                                        {subject.value.map((value, index) => (
                                            <span
        key={index}
        className={
            Number(value) < 6
                ? classes.low
                : Number(value) < 9
                    ? classes.medium
                    : classes.high
        }
    >
        {value}
    </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

            </main>
        </>
    )
}