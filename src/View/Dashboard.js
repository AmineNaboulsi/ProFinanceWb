import React, { useState , useEffect } from 'react'
import ValidationAuth from './ValidationAuth'
import tree from '../Images/tree.png'
import '../App.css'
import { FaKey } from "react-icons/fa";
import { MdOutlineDesktopWindows } from "react-icons/md";
import { GrCode } from "react-icons/gr";
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

function Dashboard (){
  const [getdate,setdate]  = useState({
    time : "",
    date : "",
    name : ""
  }) ; 


  useEffect(() => {
    const d = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    
    let hours = d.getHours();
    let minutes = d.getMinutes();
  
    if (hours < 10) hours = '0' + hours;
    if (minutes < 10) minutes = '0' + minutes;
    setdate(prev =>({
      ...prev ,
      date : new Intl.DateTimeFormat('en-US', options).format(d),
      time : `${hours}:${minutes}`
    }));
    const authToken = Cookies.get('authToken');

    if (!authToken) {
    } else {
      const apiUrl = process.env.REACT_APP_API_URL;

      fetch(`${apiUrl}/user/getname`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ usertk: authToken })
      })
      .then(res => res.json())
      .then(data => {
        console.log(data.name);

        if (data.status) {
          setdate(prev =>({
            ...prev ,
            name : data.name
          }));
        }
      })
      .catch(error => {
        console.error('Error validating token:', error);
      });
    }
  }, []);


  return (
    <div className='pageframe'>
      <div className='dateInfopanel'>
          <label className='timelable'>{getdate && getdate.time}</label>
          <label className="datelable">{getdate && getdate.date}</label>
      </div>
      <div className='ListCard'>
          <div className='panelcard'>
            <div className='cadrSTlicence'>
              <FaKey color='white' style={{height : 30 , width : 30}}/>
            </div>
            <label  style={{marginTop : 15}}>Licence key</label>
          </div>
          <div className='panelcard'>
            <div className='cadrST'>
              <MdOutlineDesktopWindows color='white' style={{height : 30 , width : 30}}/>
            </div>
            <label  style={{marginTop : 15}}>Devices</label>
          </div>
          <div className='panelcard'>
            <div className='cadrST'>
            <GrCode color='white' style={{height : 30 , width : 30}}/>
            </div>
            <label  style={{marginTop : 15}}>Crashes</label>
          </div>
      </div>
      <div className='hi'>
        <label style={{fontWeight : 600}}>Hi, {getdate && getdate.name}</label>
        <label style={{fontWeight : 100 , color : "#5D5D5D"}}>Hope you dowing good</label>
      </div> 
      <img className='imgdashboradBG' src={tree}></img>    
    </div>
  )
}
export default  ValidationAuth(Dashboard);

