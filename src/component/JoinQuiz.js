import React, { useState,useEffect } from 'react';
import './compo_css/JoinQuiz.css';
//import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios';

function JoinQuiz() {
  const [nickname, setNickname] = useState('');
  const [enteredGamePin, setEnteredGamePin] = useState('');
  const [joinedNicknames, setJoinedNickname] = useState([]);
  const [gamePin, setGamePin] = useState(null);
  //let navigate=useNavigate();


  // const gamePin = localStorage.getItem('gamePin')
  // const getCookie = (name) => {
  //   const value = `; ${document.cookie}`;
  //   const parts = value.split(`; ${name}=`);
  //   if (parts.length === 3) return parts.pop().split(';').shift();
  // };

  // const gamePin = getCookie('gamePin');
  // console.log("gamePin value in JoinQiz",gamePin);

  useEffect(()=>{
    fetchpin();
  },[]);

//   const gamePin = getCookie('gamePin');
//   console.log("gamePin value in JoinQiz",gamePin);
  const fetchpin =async () =>{

    const result=await axios.get("http://localhost:8080/getpin");
    let gamepin=result.data[5].gamepin;
    setGamePin(gamepin);
    console.log(gamePin);
    console.log(gamepin);
  };


  const handleSubmit = async(e) => {
    e.preventDefault();

    if (enteredGamePin == gamePin) {
        setJoinedNickname([...joinedNicknames, nickname]);
        setNickname('');
        setEnteredGamePin('');
        console.log('valid game pin');
    
        await axios.post("http://localhost:8080/tquiz",{
          "gamepin":gamePin,
          "nickname":nickname
      });
 
    window.open("/home")
    } else {
      console.log("enter",enteredGamePin);
      console.log("gam",gamePin);
      console.log('Invalid game pin');
      setNickname('');
      setEnteredGamePin('');
    }
  };
  return (
    <div className="join-screen">
      <h2>Join Quiz</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nickname:</label>
          <input
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Game Pin:</label>
          <input
            type="text"
            value={enteredGamePin}
            onChange={(e) => setEnteredGamePin(e.target.value)}
            required
          />
        </div>
        <button type="submit">Join</button>
      </form>
      {joinedNicknames.length > 0 && (
        <div>
          <h3>Joined Names:</h3>
          <ul>
            {joinedNicknames.map((name, index) => (
              <li key={index}>{name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
export default JoinQuiz;