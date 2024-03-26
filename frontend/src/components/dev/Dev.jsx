import React from 'react';
import AddCompetition from './InputForms/AddCompetition';
import AddTeam from './InputForms/AddTeam';

function Dev() {

  async function register(){
    const requestData = {
      email: "Diego99rojo@gmail.com",
      password: "testing1"
    }
    const response = await fetch('http://localhost:5000/firebase/register/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestData),
    });
    
  }
  
  return (
    <>
      <AddCompetition />
      <AddTeam />
      <button onClick={() => register()}>Register</button>
    </>
  );
}

export default Dev;
