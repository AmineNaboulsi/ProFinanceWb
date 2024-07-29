import React, { useEffect, useState } from 'react';
import { FaWindows } from "react-icons/fa";
import Cookies from 'js-cookie';
import LoadingAnimation from '../lotties/loading.json';
import Lottie from 'react-lottie';
import { MdOutlineDesktopWindows } from "react-icons/md";

export default function Devices() {
  const [Devices, setDevices] = useState([]);
  const [Config, setConfig] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [numberS, setnumberS] = useState({ v: 0, p: 0 });
  const [loading , setloading] = useState(false);

  const dateformat = (date) => {
    const d = new Date(date);
    let day = d.getDate();
    let month = d.getMonth() + 1;
    const year = d.getFullYear();

    const hour = d.getHours();
    const munite = d.getMinutes();
    if (day < 10) day = '0' + day;
    if (month < 10) month = '0' + month;

    return `${month}-${day}-${year} ${hour}H ${munite}min `;
  };
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: LoadingAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };
  useEffect(() => {
    const authToken = Cookies.get('authToken');

    if (!authToken) {
    } else {
      setloading(true);
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
        setloading(false);
      })
      .catch(error => {
        console.error('Error validating token:', error);
        setloading(false);
      });
    }
  }, []);

  const renderPanel = () => {
    if (!selectedDevice) return null;
    const { name, _id , isbanned } = selectedDevice;
    return (
      <>
    <div className='configBG'>
    <div className='ConfigureDevice' >
        <div className='ConfigureDevicePanel'>
          <FaWindows />
          <span>{name}</span>
          {isbanned===false && <textarea
          style={{height : 80 , width : 200}}></textarea>}
          {isbanned ? (<div style={{display : 'flex' ,flexDirection : 'row' , gap : 10}}>
            <button style={{ backgroundColor: 'green' }} onClick={() => setConfig(false)}>
              Restore
            </button>
            <button style={{ backgroundColor: '#d8d8d8'}} onClick={() => setConfig(false)}>
              cancel
              </button>
            </div>):(<div style={{display : 'flex' ,flexDirection : 'row' , gap : 10}}>
              <button style={{ backgroundColor: 'red' }} onClick={() => setConfig(false)}>
              Ban
              </button><button style={{ backgroundColor: '#d8d8d8'}} onClick={() => setConfig(false)}>
              cancel
              </button>
            </div>)}
        </div>
      </div>

    </div>
   
    
      </>
      
    );
  };

  return (
    <div className='pageframeD'>
      <h1>Devices</h1>
      {Config && renderPanel()}
      <div className='ClientDevicesPanel'>
        {loading ? (<><Lottie 
          options={defaultOptions}
          height={50}
          width={50}/></>):(<>
          {Devices && Devices.length > 0  ? Devices.map((Clientdevices, index) => (
          <>
          <div key={index} >
            <div className='clientNamePanel'>
              <label>{Clientdevices.clientname}</label>
            </div>
            <div className='paneldevices'>
              {Clientdevices.devices.map((device, i) => (
                <div
                  key={i}
                  className={device.isbanned?'deviceItemBanned':'deviceItem'}
                  onClick={() => {
                    setConfig(true);
                    setSelectedDevice(device);
                  }}
                >
                  <div style={{display : 'flex' , justifyContent :'space-between'}}>
                  <div style={{ display: 'flex', alignContent: 'center', gap: '10px' }}>
                    <FaWindows />
                    <label>{device.name}</label>
                  </div>
                  <div className={device.isbanned? 'isVMddevice' : 'isNVMddevice'}></div>
                  </div>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', alignContent: 'center', gap: '2px' }}>
                    <label>Machine Name: {device.name}</label>
                    <label>Date Activation: {dateformat(device.datea)}</label>
                    <div className={device.etatmachine ? 'etatTypeOff' : 'etatTypeOn'}>
                      <label>{device.etatmachine ? 'Virtual machine' : 'Physical machine'}</label>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          </>
        )) : (<>
          <div className='nodevices' >
            <MdOutlineDesktopWindows color='#8e8e8e' style={{height : 30 , width : 30}}/>
            <label style={{color : '#8e8e8e'}}>0 Devices</label>
          </div>             

        </>)}
        </>)}
        
      </div>      
    </div>
  );
}
