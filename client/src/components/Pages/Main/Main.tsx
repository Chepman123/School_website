import Header from "../../Header/Header";
import Nav from "../../Nav/Nav";
import classes from './Main.module.scss'
export default function Main(){
    return <>
    <Nav/>
    <Header/>
    <div className={classes.div}>
    <h3>Комунальний заклад "Ліцей №2 Козятинської міської ради Вінницької області" з великою радістю відкриває вам дорогу у світ знань!

  Наш ліцей– це не лише знання та виховання, а й комфорт та умови, в яких знання й виховання будуть засвоєні найкраще.</h3>
    </div>
    </>
}