import { Link } from 'react-router-dom';
import classes from './Header.module.scss';
import { useEffect, useState } from 'react';

export default function Header() {
    const [isAdmin, setAdmin] = useState<boolean>(false);
    const [username, setUsername] = useState<string>('');
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const[isTeacher,setTeacher] = useState<boolean>(false);
    async function GetData() {
        const response = await fetch('http://localhost:5000/header', {
            method: 'GET',
            credentials: 'include'
        });

        const result: { admin: boolean, username: string,isTeacher:boolean } = await response.json();

        setAdmin(result.admin);
        setUsername(result.username);
        setTeacher(result.isTeacher);
    }

    useEffect(() => {
        GetData();
    }, []);

    return (
        <header>

            <Link to='/' className={classes.home}>
                Головна
            </Link>

            <button
                className={classes.menuButton}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
                ☰
            </button>

            <div className={`${classes.navigation} ${isMenuOpen ? classes.open : ''}`}>

                <div className={classes.mainDiv}>
                    <h1>Про нас</h1>

                    <div className={classes.div}>
                        <Link to='/login'>Про школу</Link>
                        <Link to='/login'>Вакансії</Link>
                        <Link to='/login'>Безпека (Дії в разі НС)</Link>
                        <Link to='/login'>
                            Військово-патріотичний гурток «ДЖУРА»
                        </Link>
                    </div>
                </div>

                <div className={classes.mainDiv}>
                    <h1>Прозорість та звітність</h1>

                    <div className={classes.div}>
                        <Link to='/login'>
                            Прозорість та інформаційна відкритість
                        </Link>
                        <Link to='/login'>
                            Фінансово-господарська діяльність
                        </Link>
                    </div>
                </div>

                <div className={classes.mainDiv}>
                    <h1>Освітній процес</h1>

                    <div className={classes.div}>
                        <Link to='/login'>
                            Батькам майбутніх першокласників
                        </Link>
                        <Link to='/login'>Екстернат</Link>
                        <Link to='/login'>Критерії оцінювання</Link>
                        <Link to='/login'>Психологічна служба</Link>
                        <Link to='/login'>Корисна інформація</Link>
                    </div>
                </div>

                <div className={classes.mainDiv}>
                    <h1>Педагогам</h1>

                    <div className={classes.div}>
                        <Link to='/login'>
                            Професійні спільноти вчителів
                        </Link>
                        <Link to='/login'>
                            Атестація педагогів
                        </Link>
                        <Link to='/login'>
                            Курси підвищення кваліфікації
                        </Link>
                    </div>
                </div>

                {username !== '' && !isAdmin &&(
                    <Link
                        to={isTeacher?`/gradebook`:`/profile/${username}`}
                        className={classes.profileLink}
                    >
                        {username}
                    </Link>
                )}

                {isAdmin && (
                    <Link
                        to='/AdminPanel'
                        className={classes.adminLink}
                    >
                        Адмін панель
                    </Link>
                )}

            </div>

        </header>
    );
}