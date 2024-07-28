import React, { useEffect  ,useState} from 'react'
import { FaWindows } from "react-icons/fa";
import Cookies from 'js-cookie';

export default function Devices(){

  const [Devices , setDevices ] = useState([]);
  const [numberS , setnumberS ] = useState({
    v : 0 ,
    p : 0
  });
  const dateformat = (date) =>{
    const d = new Date(date);
    let day = d.getDate();
    let month = d.getMonth() + 1;
    const year = d.getFullYear();
  
    const hour = d.getHours();
    const munite = d.getMinutes();
    if (day < 10) day = '0' + day;
    if (month < 10) month = '0' + month;
  
    return `${month}-${day}-${year} ${hour}H ${munite}min `;
  }
  useEffect(() => {
    const authToken = Cookies.get('authToken');

    if (!authToken) {
    } else {
      const apiUrl = process.env.REACT_APP_API_URL;

      fetch(`${apiUrl}/device/getdevices`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify({ usertk: authToken })
      })
      .then(res => res.json())
      .then(data => {
        setDevices(data);

        const counts = data.reduce((acc, device) => {
          if (device.etatmachine) {
            acc.p += 1;
          } else {
            acc.v += 1;
          }
          return acc;
        }, { p: 0, v: 0 });

        setnumberS(counts);

      })
      .catch(error => {
        console.error('Error validating token:', error);
      });
    }
  }, []);

  return (
    <div className='pageframe'>
      <h1>Devices</h1>
      <div className='ClientDevicesPanel'>
        {Devices && Devices.map((Clientdevices, index) => (
          <>
          <div className='clientNamePanel'>
          <label >{Clientdevices.clientname}</label>
          </div>
          <div className='paneldevices'>
            {Clientdevices && Clientdevices.devices.map((device , i)=>(
              <div key={i} className='deviceItem'>
            <div style={{display : 'flex' , alignContent: 'center',gap : 10}}>
              <FaWindows />
              <label>{device.name}</label>
            </div>
            <div style={{display : 'flex' ,flexDirection : 'column' , alignContent: 'center',gap : 2}}>
              <label>Machine Name  : {device.name}</label>
              <label>Date Activation: {dateformat(device.datea)}</label>
              <div className={device.etatmachine ? 'etatTypeOff':'etatTypeOn'}>
                <label>{device.etatmachine ? 'Virtual machine':'Pyshic machine'}</label>
              </div>
  
            </div>
          </div>
            ))}
          </div>
          
          </>
          ))}
      </div>
      <div className='stats'>
      <hr></hr>
      <div style={{ marginLeft : 15 , marginTop : 11,display : 'flex' , flexDirection : 'column', gap : 15}}>
        <div  >
          <label style={{color : 'green'}}>Pyshic Machine : </label>0</div>
        <div >
        <label style={{color : 'red' }}>Virtual Machine : </label>0</div>
      </div>
      </div>
      
    
    </div>
  )
}