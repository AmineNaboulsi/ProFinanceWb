import React, { useState } from 'react';
import Logo from '../Images/logoB.png';
import LogoApp from "../Images/logoapp.png";
import '../App.css';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'; 
import Lottie from 'react-lottie';
import LoadingAnimation from '../lotties/loading.json';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login() {
  
  
  const [user, setUser] = useState({
    user: "",
    password: "",
    tk: "",
  });
  const [failed, setFailed] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_URL;

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: LoadingAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  const changeInputTextHandled = (e) => {
    setUser((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFailed("");
    try {
      console.log(`${apiUrl}/user/auth`);
      const response = await fetch(`${apiUrl}/user/auth`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: user.user,
          password: user.password,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.status) {
        toast.error(result.message || 'Authentication failed', {
          position : 'bottom-right'
        });
      } else {
        if(result.tk === undefined){
          toast.error(result.message || 'Authentication failed' , {
            position : 'bottom-right'
          });

        }else{
          Cookies.set('authToken', result.tk, { expires: 1 });
          toast.success(result.message || 'Authentication failed' , {
            position : 'bottom-right'
          });
          setTimeout(() => {
            navigate('/home');
          }, 1000);
         
        }
      }
    } catch (error) {
      toast.error('An error occurred during authentication.' , {
        position : 'bottom-right'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="box"></div>
      <div className="actionbar">
        <img
          src={Logo}
          alt="Logo"
          width={100}
          height={24}
        />
        <div className="actionbartitle">
          <h6>H.2B.I SOLUTIONS</h6>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="container">
          <img src={LogoApp} alt="App Logo"/>
          <h2>Gest Finance</h2>
          <div className="containerform">
            <input
              required
              type="text"
              onChange={changeInputTextHandled}
              name="user"
              style={{  color:'black' }}
              placeholder="User Name"
            />
            <input
              required
              type="password"
              name="password"
              style={{  color:'black' }}
              onChange={changeInputTextHandled}
              placeholder="Password"
            />
          </div>
          {}
          {failed && <p style={{color: 'red'}}>{failed}</p>}
          {loading && 
          <Lottie 
          options={defaultOptions}
          height={50}
          width={50}/>
          }
          
          <button type="submit" disabled={loading}>Get Started</button>
          <ToastContainer />

        </div>
        <div className="footer">
          <h1>78, Bd la résistance Res El Marzouki - Casablanca</h1>
          <div className="footerbottom">
            <h1>contact.h2bisolutions@gmail.com</h1>
            <h1>Tél : +212 664099003</h1>
          </div>
        </div>
      </form>
    </>
  );
}
