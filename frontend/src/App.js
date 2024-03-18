import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import AddCompetition from './components/competitions/AddCompetition';
import Home from './components/home/Home';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/competitions/add" element={<Layout><AddCompetition /></Layout>} />
      <Route path="/" element={<Layout><Home /></Layout>} />
    </Routes>
  );
}

export default App;
