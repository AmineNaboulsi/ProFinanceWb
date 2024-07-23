import React, { useState } from 'react';
import Logo from '../Images/logoB.png';
import LogoApp from "../Images/logoapp.png";
import '../App.css';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'; 


export default function Login() {
  
  
  const [user, setUser] = useState({
    user: "",
    password: "",
    tk: "",
  });
  const [failed, setFailed] = useState(""); // Error message
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_URL;

  const changeInputTextHandled = (e) => {
    setUser((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

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
        setFailed(result.message || 'Authentication failed');
      } else {
        if(result.tk === undefined){
          setFailed(result.message || 'Authentication failed');
        }else{
          Cookies.set('authToken', result.tk, { expires: 1 });
          navigate('/home');
        }
      }
    } catch (error) {
      console.log('Error:', error);
      setFailed('An error occurred during authentication.');
    } finally {
      setLoading(false); // Stop loading
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
              placeholder="User Name"
            />
            <input
              required
              type="password"
              name="password"
              onChange={changeInputTextHandled}
              placeholder="Password"
            />
          </div>
          {failed && <p style={{color: 'red'}}>{failed}</p>}
          <button type="submit" disabled={loading}>Get Started</button> {/* Disable button while loading */}
          {loading && <div className="progress-bar"></div>} {/* Show progress bar while loading */}
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
