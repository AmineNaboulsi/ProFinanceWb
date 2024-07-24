import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa";
import { DiMsqlServer } from "react-icons/di";
import { FaCopy } from "react-icons/fa";
import { IoIosRocket } from "react-icons/io";
import Cookies from 'js-cookie';

export default function Selectlicence() {
  const location = useLocation();
  const navigate = useNavigate();
  const { rowData } = location.state || {}; // Provide a default empty object

  const [licence, setLicence] = useState(null); // Initialize state as null or an empty object if preferred
  const [loading, setLoading] = useState(true); // Add a loading state
  const [error, setError] = useState(null); // Add an error state

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
    setLicence((prevData) => ({
      ...prevData,
      expireon: new Date(value).getTime(),
    }));
  };

  useEffect(() => {
    const authToken = Cookies.get('authToken');

    fetch(`${apiUrl}/lk/getbyId`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: rowData.id, 
        usertk: authToken 
        // Ensure this matches the field name
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setLicence(data); // Directly set the data object
        setLoading(false); // Set loading to false once data is fetched
      })
      .catch((error) => {
        console.error('Error fetching licence data:', error);
        setError(error); // Set error state if an error occurs
        setLoading(false); // Set loading to false even if there is an error
      }); 
  }, [rowData]);

  return (
    <div style={{padding: 30 , backgroundColor : "#F1F1F1" , width : "100%"}}>
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
                  <div className={licence && licence.type==='monoposte' ? 'cardtypeA': 'cardtypeB'} style={{display : 'flex',flexDirection:'row'}}>
                    <DiMsqlServer />
                    <label>Monoposte</label>
                  </div>
                  <div className={licence && licence.type==='monoposte' ? 'cardtypeB': 'cardtypeA'}>
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
              {licence && licence.type !=='monoposte' 
              
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
              <label className='appnotdeclared' >Cette clé de licence n'est reconnue sur aucune appareil</label>
            </div>
            <button style={{display : 'none'}} className='btndave'
            >Enregistrer</button>
          </div>
      </div>
    </div>
  );
}
