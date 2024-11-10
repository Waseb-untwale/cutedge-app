// Components/Login.js
import React from 'react';
import Home from './Home'
import { useNavigate } from 'react-router-dom';
const Login = () => {
 let naviagte = useNavigate()
  const onLogin=()=>{
    naviagte('/Blog')
 }
  return (
    <div>
      <h2>Login Page (Dummy)</h2>
      <button onClick={onLogin}>Login</button>
    </div>
  );
};

export default Login;
