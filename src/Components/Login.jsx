// Components/Login.js
import React from 'react';

const Login = ({ onLogin }) => {
  return (
    <div>
      <h2>Login Page (Dummy)</h2>
      <button onClick={onLogin}>Login</button>
    </div>
  );
};

export default Login;
