
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Pages/RegLog/Login';
import Footer from './components/Footer/Footer';
import Main from './components/Pages/Main/Main';
import AdminPanel from './components/Pages/AdminPanel/AdminPanel';
export default function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/Login' element={<Login/>}/>
        <Route path='/' element={<Main/>}/>
        <Route path='/AdminPanel' element={<AdminPanel/>}/>
      </Routes>
      <Footer/>
      </BrowserRouter>
     
    </>
  );

}

