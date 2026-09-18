import classes from './Footer.module.scss'
export default function Footer(){
    return <footer>
        <p>© 2016 "ЗШ №2 м. КОЗЯТИН"</p>
         <a href="https://www.youtube.com/channel/UCaPDemX9BCgcUbvoXq6asGQ" target="_blank" rel="noreferrer" className={`${classes.icon} ${classes.youtube}`}>
          <i className="fab fa-youtube"></i>
        </a>
    </footer>
}