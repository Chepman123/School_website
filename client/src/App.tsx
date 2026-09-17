
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Pages/RegLog/Login';
import Reg from './components/Pages/RegLog/Reg';
export default function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>

        <Route path='/Login' element={<Login/>}/>
        <Route path='/Reg' element={<Reg/>}/>
      </Routes>
      </BrowserRouter>
     
    </>
  );

}

