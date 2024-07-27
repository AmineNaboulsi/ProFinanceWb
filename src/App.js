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
import withValidationAuth from './View/ValidationAuth';
import Devices from './View/Devices';


const DashboardWithAuth = withValidationAuth(Dashboard);
const AddlicenceWithAuth = withValidationAuth(Addlicence);
const LicencekeyWithAuth = withValidationAuth(Licencekey);
const SelectlicenceWithAuth = withValidationAuth(Selectlicence);
const DevicesWithAuth = withValidationAuth(Devices);
const LogsWithAuth = withValidationAuth(Logs);


function App() {
  return (
   <BrowserRouter>
   <Routes>
    <Route path='/'>
      <Route index element={<Login />} />
      <Route path='*' element={<Notfound />} />
    </Route>
    <Route path='/home' element={<Layoutadmin />}>
          <Route index element={<DashboardWithAuth />} />
          <Route path='/home/licencekey' element={<LicencekeyWithAuth />} />
          <Route path='/home/logs' element={<LogsWithAuth />} />
          <Route path='/home/selectlicence' element={<SelectlicenceWithAuth />} />
          <Route path='/home/addlicence' element={<AddlicenceWithAuth />} />
          <Route path='/home/devices' element={<DevicesWithAuth />} />
          </Route>
   </Routes>
   </BrowserRouter>
  );
}

export default App;
