import React from 'react'
import Lottie from 'react-lottie';
import LoadingAnimation from '../lotties/nofound.json';
import { useNavigate } from 'react-router-dom';

export default function Notfound(){

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: LoadingAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };
  const navigate = useNavigate();
  return (
    <div style={{display : 'flex', flexDirection : 'column', justifyContent : "center" , gap : 15 , alignItems : 'center' ,height :'100svh' }}>
      <Lottie 
          options={defaultOptions}
          height={200}
          width={200}/>      
      Page not found
      <button onClick={()=>{
        navigate('/home');
      }}>Back Home</button>
    </div>
  )
}

