import React, { useState } from 'react';
import './LoginRegister.css';

const LoginRegister = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);

  async function login(email, password){
    const requestData = {
      email: email,
      password: password
    }
    const response = await fetch('http://localhost:5000/firebase/login/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestData),
    });

    if(response.ok){
      const user = await response.json();
      localStorage.setItem("access token", user.stsTokenManager.accessToken);
      localStorage.setItem("refresh token", user.stsTokenManager.refreshToken);
    }
    else{
      alert("Login did not work")  
    }
       
  }

  async function register(email, password){
    const requestData = {
      email: email,
      password: password
    }
    const response = await fetch('http://localhost:5000/firebase/register/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestData),
    });
    if(response.ok){
      // localStorage.setItem()
      alert("User registered");
    }
    else{
      alert("Register did not work")  
    }
    
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if(isLogin){
      login(email, password);
    }
    else{
      register(email, password);
    }
  };

  return (
    <div className="login-register-container">
      <h2>{isLogin ? 'Login' : 'Register'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
      </form>
      <p onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? 'Don\'t have an account? Register here' : 'Already have an account? Login here'}
      </p>
    </div>
  );
};

export default LoginRegister;
