import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CheckLimit from './CheckLimit';
import { useNavigate } from 'react-router-dom';
import './compo_css/Home.css';

const Home = () => {

  const [gamePin, setGamePin] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [timeLeft, setTimeLeft] = useState(100);
  const [qstart, setqstart] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let timer;
    if (qstart && timeLeft > 0) {
      timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [qstart, timeLeft]);
  

  useEffect(() => {
    const fetchgamepin = async () => {
      try {
        const pin = Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000;
        setGamePin(pin);


      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchgamepin();
    fetchquestion();
  }, []);


  useEffect(() => {
    localStorage.removeItem("start");
    loadgamepin();
  }, [gamePin]);

  const loadgamepin = async () => {

    if (gamePin != null) {
      await axios.post("http://localhost:8080/gpin", {
        "gamepin": gamePin
      });
      console.log("r", gamePin);
      
    await axios.post("http://localhost:8080/gstart",{  
      "checkstatus":"no"
  });

    }
    else {
      console.log("error null")
    }
  };

  const fetchquestion = async() =>{
    try {
      const apiKey = 'jJP2xGc8xo9BWxD2DbGdT6kdSkYzMJwmg8g8XcUr';
      const limit = 10;

      const response = await axios.get('https://quizapi.io/api/v1/questions', {
        params: {
          apiKey: apiKey,
          limit: limit
        }
      });
      setQuestions(response.data);
      console.log(response.data);
      
    } catch (error) {
      console.error('Error fetching data:', error);
    }

  }

  const handledeletedata = () =>{
    navigate("/home");
  }

  const handleStartQuiz = async() => {
    await axios.post("http://localhost:8080/gstart",{  
      "checkstatus":"yes"
  });
  sendQuestionsToBackend();
  setqstart(true);
    };

  const sendQuestionsToBackend = async () => {

    const updatedAns = [];
    for (let i = 0; i < 10; i++) {

      if (questions[i].correct_answers.answer_a_correct === "true") {
        updatedAns[i] = "answer_a";
      }

      else if (questions[i].correct_answers.answer_b_correct === "true") {
        updatedAns[i] = "answer_b";

      }

      else if (questions[i].correct_answers.answer_c_correct === "true") {
        updatedAns[i] = "answer_c";
      }

      else if (questions[i].correct_answers.answer_d_correct === "true") {
        updatedAns[i] = "answer_d";
      }

      else if (questions[i].correct_answers.answer_e_correct === "true") {
        updatedAns[i] = "answer_e";
      }

      else if (questions[i].correct_answers.answer_f_correct === "true") {
        updatedAns[i] = "answer_f";
      }
    }

    const questionsData = [

      { "question": questions[0].question, "correctAnswer": updatedAns[0], "option_a": questions[0].answers.answer_a, "option_b": questions[0].answers.answer_b, "option_c": questions[0].answers.answer_c, "option_d": questions[0].answers.answer_d, "option_e": questions[0].answers.answer_e, "option_f": questions[0].answers.answer_f },
      { "question": questions[1].question, "correctAnswer": updatedAns[1], "option_a": questions[1].answers.answer_a, "option_b": questions[1].answers.answer_b, "option_c": questions[1].answers.answer_c, "option_d": questions[1].answers.answer_d, "option_e": questions[1].answers.answer_e, "option_f": questions[1].answers.answer_f },
      { "question": questions[2].question, "correctAnswer": updatedAns[2], "option_a": questions[2].answers.answer_a, "option_b": questions[2].answers.answer_b, "option_c": questions[2].answers.answer_c, "option_d": questions[2].answers.answer_d, "option_e": questions[2].answers.answer_e, "option_f": questions[2].answers.answer_f },
      { "question": questions[3].question, "correctAnswer": updatedAns[3], "option_a": questions[3].answers.answer_a, "option_b": questions[3].answers.answer_b, "option_c": questions[3].answers.answer_c, "option_d": questions[3].answers.answer_d, "option_e": questions[3].answers.answer_e, "option_f": questions[3].answers.answer_f },
      { "question": questions[4].question, "correctAnswer": updatedAns[4], "option_a": questions[4].answers.answer_a, "option_b": questions[4].answers.answer_b, "option_c": questions[4].answers.answer_c, "option_d": questions[4].answers.answer_d, "option_e": questions[4].answers.answer_e, "option_f": questions[4].answers.answer_f },
      { "question": questions[5].question, "correctAnswer": updatedAns[5], "option_a": questions[5].answers.answer_a, "option_b": questions[5].answers.answer_b, "option_c": questions[5].answers.answer_c, "option_d": questions[5].answers.answer_d, "option_e": questions[5].answers.answer_e, "option_f": questions[5].answers.answer_f },
      { "question": questions[6].question, "correctAnswer": updatedAns[6], "option_a": questions[6].answers.answer_a, "option_b": questions[6].answers.answer_b, "option_c": questions[6].answers.answer_c, "option_d": questions[6].answers.answer_d, "option_e": questions[6].answers.answer_e, "option_f": questions[6].answers.answer_f },
      { "question": questions[7].question, "correctAnswer": updatedAns[7], "option_a": questions[7].answers.answer_a, "option_b": questions[7].answers.answer_b, "option_c": questions[7].answers.answer_c, "option_d": questions[7].answers.answer_d, "option_e": questions[7].answers.answer_e, "option_f": questions[7].answers.answer_f },
      { "question": questions[8].question, "correctAnswer": updatedAns[8], "option_a": questions[8].answers.answer_a, "option_b": questions[8].answers.answer_b, "option_c": questions[8].answers.answer_c, "option_d": questions[8].answers.answer_d, "option_e": questions[8].answers.answer_e, "option_f": questions[8].answers.answer_f },
      { "question": questions[9].question, "correctAnswer": updatedAns[9], "option_a": questions[9].answers.answer_a, "option_b": questions[9].answers.answer_b, "option_c": questions[9].answers.answer_c, "option_d": questions[9].answers.answer_d, "option_e": questions[9].answers.answer_e, "option_f": questions[9].answers.answer_f },

    ];

    for (let j = 0; j < 10; j++) {
      try {
        const response = await axios.post('http://localhost:8080/question', questionsData[j]);
        //console.log('Questions saved successfully:', response);
      } catch (error) {
        console.error('Error saving questions:', error);
      }
    }
  };



  return (
    <div className="app">
      {gamePin && <h1 className='gamepin'>Game Pin: {gamePin}</h1>}
      <CheckLimit />
      {qstart ? (
        timeLeft == 0 ? (
          <button onClick={
            handledeletedata
          }>Restart Quiz</button>
        ):(
          <div></div>
        )

      ):
      (
        <button onClick={
          handleStartQuiz
        }>Start Quiz</button>
      )

      }

    </div>
  );
};

export default Home;