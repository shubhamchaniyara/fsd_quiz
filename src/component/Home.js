import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CheckLimit from './CheckLimit';
// import JoinQuiz from './JoinQuiz';
import './Quiz.css';

const Home= () => {

    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);
    const [isRestart, setisRestart] = useState(false);
    const [gamePin, setGamePin] = useState(null);
    const [quizStarted, setQuizStarted] = useState(false);
    const [timeLeft, setTimeLeft] = useState(120); 
    const [joinedNicknames, setJoinedNickname] = useState([]);

    useEffect(() => {
        async function fetchQuestions() {
          try {
            const apiKey = 'jJP2xGc8xo9BWxD2DbGdT6kdSkYzMJwmg8g8XcUr';
            const limit = 10;
            const pin = Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000;
            setGamePin(pin);
            // document.cookie = `gamePin=${pin}; expires=Thu, 18 Dec 2025 12:00:00 UTC`;
            // console.log(pin);
            // document.cookie = `gamePin=${pin}; expires=Thu, 18 Dec 2025 12:00:00 UTC`;
             console.log(pin);
            const response = await axios.get('https://quizapi.io/api/v1/questions', {
              params: {
                apiKey: apiKey,
                limit: limit
              }
            });
            setQuestions(response.data);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        }
        fetchQuestions();
      }, [isRestart]);


      useEffect(() => {
        let timer;
        if (quizStarted && timeLeft > 0) {
          timer = setTimeout(() => {
            setTimeLeft(timeLeft - 1);
          }, 1000);
        } else if (timeLeft === 0) {
          handleEndQuiz();
        }
        return () => clearTimeout(timer);
      }, [quizStarted, timeLeft]);

      useEffect(()=>{
        loadusers();
        loadgamepin();
      },[gamePin]);

      const loadusers=async () =>{

        const result=await axios.get("http://localhost:8080/QuizPlay");
        setJoinedNickname(result.data);
      };

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

      
};