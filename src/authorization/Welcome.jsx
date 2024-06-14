import React from 'react';
import { Link } from 'react-router-dom';
import './Welcome.css';

const Welcome = () => {
  return (
    <div className="welcome-page">
      <div className="navigation-buttons">
        <h1>Welcome to Quiz Competition</h1>
        <Link to="/login"><button className="btn">Login</button></Link>
        <Link to="/signup"><button className="btn">Signup</button></Link>
      </div>
    </div>
  );
};

export default Welcome;