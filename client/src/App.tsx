
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Pages/RegLog/Login';
import Footer from './components/Footer/Footer';
import Main from './components/Pages/Main/Main';
import AdminPanel from './components/Pages/AdminPanel/AdminPanel';
import NewsPage from './components/Pages/NewsPage/NewsPage';
import AllNews from './components/Pages/AllNews/AllNews';
import Profile from './components/Pages/Profile/Profile';
import GradeBook from './components/Pages/GradeBook/GradeBook';
export default function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/Login' element={<Login/>}/>
        <Route path='/' element={<Main/>}/>
        <Route path='/AdminPanel' element={<AdminPanel/>}/>
         <Route path='/news/:id' element={<NewsPage/>}/>
         <Route path='/news' element={<AllNews/>}/>
         <Route path='/profile/:username' element={<Profile/>}/>
         <Route path='gradebook' element={<GradeBook/>}/>
      </Routes>
      <Footer/>
      </BrowserRouter>
     
    </>
  );

}

