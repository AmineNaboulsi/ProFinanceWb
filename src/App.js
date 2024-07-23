import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './View/Login'
import Dashboard from './View/Dashboard'
import Notfound from './View/Notfound'
import { Layoutadmin } from "./Layout/Layoutadmin"
import Licencekey from './View/Licencekey'
import Logs from './View/Logs'
import Selectlicence from './View/Selectlicence'
import Addlicence from './View/Addlicence'


function App() {
  return (
   <BrowserRouter>
   <Routes>
    <Route path='/'>
      <Route index element={<Login />} />
      <Route path='*' element={<Notfound />} />
    </Route>
    <Route path='/home' element={<Layoutadmin />}>
          <Route index element={<Dashboard />} />
          <Route path='/home/licencekey' element={<Licencekey />} />
          <Route path='/home/logs' element={<Logs />} />
          <Route path='/home/selectlicence' element={<Selectlicence />} />
          <Route path='/home/addlicence' element={<Addlicence />} />
          </Route>
   </Routes>
   </BrowserRouter>
  );
}

export default App;
