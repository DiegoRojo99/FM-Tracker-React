import React from 'react';
import { Link } from 'react-router-dom';
import './Nav.css'

function Nav() {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/developer">Dev</Link></li>
        <li><Link to="/map">Map</Link></li>
        {/* <li><Link to="/competitions/view">View Competitions</Link></li>
        <li><Link to="/challenges/add">Add Challenge</Link></li>
        <li><Link to="/challenges/view">View Challenges</Link></li> */}
      </ul>
    </nav>
  );
}

export default Nav;
