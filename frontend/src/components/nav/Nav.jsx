import React from 'react';
import { Link } from 'react-router-dom';
import './Nav.css'

function Nav() {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/map">Map</Link></li>
        <li><Link to="/challenges">Challenges</Link></li>
      </ul>
      
      <div className='login'><Link to="/login">Login</Link></div>
    </nav>
  );
}

export default Nav;
