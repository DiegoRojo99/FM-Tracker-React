import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/home/Home';
import './App.css';
import Dev from './components/dev/Dev';
import Map from './components/map/TrophiesMap';
import LoginRegister from './components/login/LoginRegister';
import { onAuthStateChanged } from '@firebase/auth';
import { auth } from './firebase';

function App() {

  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        console.log("uid", uid)
      } else {
        console.log("user is logged out")
      }
    });
  }, [])

  return (
    <Routes>
      <Route path="/developer" element={<Layout><Dev /></Layout>} />
      <Route path="/map" element={<Layout><Map /></Layout>} />
      <Route path="/" element={<Layout><Home /></Layout>} />
      <Route path="/login" element={<Layout><LoginRegister /></Layout>} />
    </Routes>
  );
}

export default App;
