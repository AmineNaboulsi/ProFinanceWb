import React, { useEffect  ,useState} from 'react'
import { FaWindows } from "react-icons/fa";
import Cookies from 'js-cookie';

export default function Devices(){

  const [Devices , setDevices ] = useState([]);
  const [numberS , setnumberS ] = useState({
    v : 0 ,
    p : 0
  });

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
      <div className='paneldevices'>
        {Devices && Devices.map((device, index) => (
          
            <div key={index} className='deviceItem'>
            <div style={{display : 'flex' , alignContent: 'center',gap : 10}}>
              <FaWindows />
              <label>{device.os}</label>
            </div>
            <div style={{display : 'flex' ,flexDirection : 'column' , alignContent: 'center',gap : 2}}>
              <label>Machine Name  : {device.name}</label>
              <label>Date Activation: {device.datea}</label>
              <div className={device.etatmachine ? 'etatTypeOn':'etatTypeOff'}>
                <label>{device.etatmachine ? 'Pyshic machine':'Virtual machine'}</label>
              </div>
  
            </div>
          </div>
          ))}
      </div>
      <div className='stats'>
      <hr></hr>
      <div style={{ marginLeft : 15 , marginTop : 11,display : 'flex' , flexDirection : 'column', gap : 15}}>
        <div  >
          <label style={{color : 'green'}}>Pyshic Machine : </label>{numberS.p}</div>
        <div >
        <label style={{color : 'red' }}>Virtual Machine : </label>{numberS.v}</div>
      </div>
      </div>
      
    
    </div>
  )
}