import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa";
import { DiMsqlServer } from "react-icons/di";
import { FaCopy } from "react-icons/fa";
import { IoIosRocket } from "react-icons/io";
import Cookies from 'js-cookie';
import Lottie from 'react-lottie';
import LoadingAnimation from '../lotties/loading.json';
import LoadingAdvance from '../lotties/loading2.json';
import { IoTime } from "react-icons/io5";
import { FaWindows } from "react-icons/fa";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

export default function Selectlicence() {
  const location = useLocation();
  const navigate = useNavigate();
  const { rowData } = location.state || {};

  const [licence, setLicence] = useState(null);
  const [licenceDevices, setlicenceDevices] = useState(null);

  const [loading, setLoading] = useState(true);
  const [LoadingA, setLoadingA] = useState(false);

  const [error, setError] = useState(null);
  const [changeData, setchangeData] = useState(false);

  const apiUrl = process.env.REACT_APP_API_URL;


  const handleCopyClickS = () => {
    navigator.clipboard.writeText(licence.licencekeyS);
  };

  const handleCopyClickM = () => {
    navigator.clipboard.writeText(licence.licencekeyS);
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  
  const handleDateChange = (e) => {
    const { value } = e.target;
    const Todaydate = new Date();
    const DatePicked = new Date(value);
    if(Todaydate >= DatePicked){
      toast.error('Date provided for expired licence less then 1 day minimum', {
        position : 'bottom-right'
      });
    }else{
      setLicence((prevData) => ({
        ...prevData,
        expireon: new Date(value).getTime(),
      }));
      setchangeData(true);
    }
    
  };

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: LoadingAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };
  const defaultOptionsA = {
    loop: true,
    autoplay: true,
    color : '#F47038',
    animationData: LoadingAdvance,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };
  const fd = (date) => {
    if (!(date instanceof Date)) {
      date = new Date(date);
    }
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${day}-${month}-${year} ${hours}:${minutes}`;
  };
  const HandledUpdateCHnagesClick =()=>{
    setLoadingA(true);
    const authToken = Cookies.get('authToken');

    fetch(`${apiUrl}/lk/uplk`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${authToken}`

      },
      body: JSON.stringify({
        id: rowData.id, 
        date_expiredOn : licence.expireon ,
        version :licence.version
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if(data.status){
          toast.warning('Updated', {
            position : 'bottom-right'
          });
          setchangeData(false);
          setLoadingA(false);
        }
        
      })
      .catch((error) => {
        setError(error); // Set error state if an error occurs
        setLoading(false);
      }); 
  }
  useEffect(() => {
    setLoading(true);
    setchangeData(false);
    const authToken = Cookies.get('authToken');
    if(authToken){
      fetch(`${apiUrl}/lk/getbyId`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: rowData.id, 
          usertk: authToken 
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          setLicence(data);
          const fdateFromAPI = new Date(licence.date_activation);

          setLicence(prev =>({
            ...prev,
            date_activation : fdateFromAPI
          }));
          setLoading(false);
        })
        .catch((error) => {
          setError(error);
          setLoading(false);
        }); 
     fetch(`${apiUrl}/device/getdevicesbyc`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${authToken}`
          },
          body: JSON.stringify({
            client: rowData.id, 
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            setlicenceDevices(data);
            console.log(data);
          })
          .catch((error) => {
            setError(error); // Set error state if an error occurs
            setLoading(false);
          }); 
    }else{
      setLoading(true); 

    }
   
  }, [rowData]);

  return (

    <div style={{padding: 30 , backgroundColor : "#F1F1F1" , width : "100%"}}>
      {!loading ? 
      <>
      <div className='backspace' onClick={() => navigate(-1)}>
        <FaArrowLeft style={{cursor : 'pointer'}}/>
        <h2 style={{cursor : 'pointer'}}>{licence && licence.client}</h2>
      </div>
      <div className='parts'>
          <div className='left-side-part'>
            <div className='left-side-p1'>
              <div style={{display : 'flex',flexDirection:'column', gap : 8}}>
                <label>Client</label>
                <input className='fieldtxt' type='text' value={licence && licence.client}/>
              </div>
              <div style={{display : 'flex',flexDirection:'column' , gap : 8}}>
                <label>Type</label>
                <div className='typespace'>
                  <div className={licence && licence.type==='monopost' ? 'cardtypeA': 'cardtypeB'} style={{display : 'flex',flexDirection:'row'}}>
                    <DiMsqlServer />
                    <label>Monoposte</label>
                  </div>
                  <div className={licence && licence.type==='monopost' ? 'cardtypeB': 'cardtypeA'}>
                    <DiMsqlServer />
                    <label>Reseaux</label>
                  </div>
                </div>
              </div>
            </div>
            <div className='left-side-p2'>
              <div className='p2-server-row'>
                <label>Server</label>
                <div className='p2-server_txt'>
                  <label>{licence && licence.licencekeyS}</label>
                  <FaCopy onClick={handleCopyClickS} style={{cursor:  "pointer"}}/>
                </div>
              </div>
              {licence && licence.type !=='monopost' 
              
              ? (
                <>
                <div className='p2-machine-row'>
                <label>Machine</label>
                  <div className='p2-machine_txt'>
                    <label >{licence && licence.licencekeyM}</label>
                    <FaCopy onClick={handleCopyClickM} style={{cursor:  "pointer"}}/>
                  </div>
                </div>
                <label className='fivemachines'>vous avez 5 machines au maximum pour cette version d'application</label>
                </>
              ) : (<></>)}
             </div>
            <div className='left-side-p3'>
            <label>Upgrade plan</label>
              <div className='upgradebtn'>
                <IoIosRocket />
                <label style={{  cursor: "pointer" , fontSize : 12}}>Upgrade</label>
              </div>
            </div>
          </div>
          <div className='right-side-part'>
            <div className='right-side-p1'>
              <label style={{textAlign : 'center'}}>Version</label>
              <div className= {licence && licence.version==='demo' ? 'cadreversionOn': 'cadreversionoff'} >
                <label >Demo</label>
              </div>
              <div className={licence && licence.version==='demo' ? 'dateEx' :'dateExx' }>
              {licence && licence.version==='demo' ? (
                <>
                    <label >A expiré le</label>
                    <input className='dateformat' type='date'
                    value={formatDate(licence && licence.expireon)}
                    onChange={handleDateChange}
                   />
                </>
              ): (<label style={{textAlign : 'center'}}>Version a vie</label>)}
              </div>
              <div className= {licence && licence.version==='demo' ? 'cadreversionoff': 'cadreversionOn'}>
                <label >Complete</label>
              </div>
            </div>
            <div className='right-side-p2'>
              {licenceDevices && licenceDevices.map((device , index)=>(
                 <>
                 <div className={device.IsServer?'deviceInfoS':'deviceInfoM'}>
                   <div className='machineInfo'>
                     <label >Machine {index}: {device.name}</label>
                     <FaWindows />
                   </div>
                 </div>
                 </>
              ))
              }
              {licenceDevices && licenceDevices.length === 0 && (<div className='deviceInfoNone'>
                      Cette clé de licence n'est reconnue sur aucun appareil.
                  </div>)
              }
            </div>
            <div className={changeData ?'btndaveV' : 'btndaveN'} disabled= {!changeData} onClick={HandledUpdateCHnagesClick}
            >
              <div style={{display : "flex" , flexDirection : "row" , justifyContent : "center" , alignContent : "center"}}> 
              <Lottie 
              className={LoadingA ? 'LottieL':'LottieLN'}
              options={defaultOptionsA}
              height={20} width={20}
              />
          <label style={{color : "#fff" , alignContent : 'center'}}>Enregistrer les modifications</label>
          
              </div>
              </div>
            <ToastContainer />
          </div>
      </div>
      </> : (<>
        <Lottie 
          options={defaultOptions}
          height={50}
          width={50}/>
      </>)
      }
      
    </div>
  );
}
