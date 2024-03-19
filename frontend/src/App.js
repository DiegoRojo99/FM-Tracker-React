import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/home/Home';
import './App.css';
import Dev from './components/dev/Dev';

function App() {
  return (
    <Routes>
      <Route path="/developer" element={<Layout><Dev /></Layout>} />
      <Route path="/" element={<Layout><Home /></Layout>} />
    </Routes>
  );
}

export default App;
