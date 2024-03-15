import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CheckLimit from './CheckLimit';
// import JoinQuiz from './JoinQuiz';
import './compo_css/Home.css';

const Home= () => {

    const [gamePin, setGamePin] = useState(null);


    useEffect(() => {
        const fetchQuestions= async()=> {
          try {
            const pin = Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000;
            setGamePin(pin);
            // document.cookie = `gamePin=${pin}; expires=Thu, 18 Dec 2025 12:00:00 UTC`;
            // console.log(pin);
            // document.cookie = `gamePin=${pin}; expires=Thu, 18 Dec 2025 12:00:00 UTC`;
      
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        }
        fetchQuestions();
      }, []);


      useEffect(()=>{
        loadgamepin();
      },[gamePin]);

      const loadgamepin=async () =>{

        if(gamePin!=null)
        {
          await axios.post("http://localhost:8080/gpin",{
          "gamepin":gamePin});
          console.log("r",gamePin);
        }
        else{
          console.log("error null")
        }
    
      };


      return (
        <div className="app">
              {gamePin && <h1 className='gamepin'>Game Pin: {gamePin}</h1>}
              <CheckLimit />
        </div>
      );
};

export default Home;