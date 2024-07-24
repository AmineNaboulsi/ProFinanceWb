import React ,{ useState } from 'react';
import { DiMsqlServer } from "react-icons/di";
import Cookies from 'js-cookie';

function Addlicence (){
  const [licenceData ,  setlicenceData] = useState({
    client:"" ,
    type:"monoposte" ,
    version : "demo" ,
    isMonopost : true,
    expireon: null,
    etat:"libéllée",
    isvalide : true,
  });

  const ApiUrl = process.env.REACT_APP_API_URL;

  const handledSaveLicence = () =>{
    if(licenceData && licenceData.client === ""){
      alert("Nom de client obligation");
    }
    else if(licenceData && licenceData.expireon === null && licenceData.version === "demo"){
      alert("Date expiration de version demo Obligatoire");
    }
    else if(licenceData){
      const currentDate = new Date();
      const formattedDate = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')}`;
      let DateExpor = null ; 
      if(licenceData.version === "complet"){
        DateExpor = formattedDate;
      }else{
        DateExpor = licenceData.expireon;
      }
      const authToken = Cookies.get('authToken');
      fetch(`${ApiUrl}/lk/newkey` ,
        {  method:'POST',
          headers : {
            'Content-Type' : "application/json"
          } ,
          body : JSON.stringify(
            { client : licenceData.client, 
              type : licenceData.type,
              version : licenceData.version,
              isMonopost : licenceData.isMonopost,
              expireon : DateExpor,
              etat : licenceData.etat,
              usertk : authToken }
          )},
        
      ).then(res=>res.json()).then(data=>
      {
        const dataString = JSON.stringify(data, null, 2);
        alert(dataString);
      }
      );
    }
    
  }
    const handleMonopostClick = (isMonopost) => {
      const tp = isMonopost?'monopost':'reseaux';
      setlicenceData((prev) => ({
        ...prev,
        isMonopost,
        type : tp
      }));

  }

  const handleVersionClick = (isComplet) =>{
    const value = isComplet ? 'complet': 'demo';
    setlicenceData((prev) => ({
      ...prev,
      version : value
    }));
  }
  return (
    <div style={{padding: 30 , backgroundColor : "#F1F1F1" , width : "100%"}}>
     <h2 style={{cursor : 'pointer'}}>New Key</h2>
      <div className='parts'>
          <div className='left-side-part'>
            <div className='left-side-p1'>
              <div style={{display : 'flex',flexDirection:'column', gap : 8}}>
                <label>Client</label>
                <input className='fieldtxt' type='text'
                 value={licenceData && licenceData.client} 
                 name='client'
                 onChange={(e)=>{
                  const {name , value} = e.target ;
                  setlicenceData(prev =>({
                    ...prev , 
                    [name] : value
                   }));
                 }}
                 placeholder='Name'/>
              </div>
              <div style={{display : 'flex',flexDirection:'column' , gap : 8}}>
                <label>Type</label>
                <div className='typespace'>
                  <div className={licenceData && licenceData.isMonopost ?'cardtypeA' :'cardtypeB'} 
                  onClick={()=>handleMonopostClick(true)}>
                    <DiMsqlServer />
                    <label>Monoposte</label>
                  </div>
                  <div className={licenceData && licenceData.isMonopost ?'cardtypeB' :'cardtypeA'}  
                  onClick={()=>handleMonopostClick(false)}>
                    <DiMsqlServer />
                    <label>Reseaux</label>
                  </div>
                </div>
              </div>
            </div>
        
          </div>
          <div className='right-side-part'>
            <div className='right-side-p1'>
              <label style={{textAlign : 'center'}}>Version</label>
              <div className={licenceData && licenceData.version==='demo' ? 'cadreversionOn':'cadreversionoff' } 
              onClick={()=>handleVersionClick(false)}>
                <label >Demo</label>
              </div>
              {licenceData && licenceData.version==='demo' ?(
                <>
                    <div className='dateEx' >
                <label >A expiré le</label>
                <input className='dateformat' 
                name='expireon'
                type='date'
                 onChange={(e)=>{
                  const {name , value} = e.target ;
                  setlicenceData(prev =>({
                    ...prev , 
                    [name] : value
                   }));
                 }}
                 />
              </div>
                    </>
              ):(<></>)
                    
              }
              
              <div className={licenceData && licenceData.version==='complet' ? 'cadreversionOn':'cadreversionoff' } 
              onClick={()=>handleVersionClick(true)}>
                <label >Complete</label>
              </div>
            </div>

            <button className='btndave'
            onClick={handledSaveLicence}>Enregistrer</button>
          </div>
      </div>
    </div>
  );
}

export default Addlicence;