import React, { useState } from 'react';
import './LoginRegister.css';
import { auth } from '../../firebase';
import { signInWithEmailAndPassword } from '@firebase/auth';

const LoginRegister = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);

  async function login(email, password){
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage)
      });
       
  }

  async function register(email, password){
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });    
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
