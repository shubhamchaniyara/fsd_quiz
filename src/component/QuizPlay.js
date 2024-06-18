import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import JoinQuiz from './JoinQuiz';
import './compo_css/QuizPlay.css';
import {useNavigate} from 'react-router-dom';




const QuizPlay = () => {

  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [quizend, setquizend] = useState(false);
  const [showScore, setShowScore] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isRestart, setisRestart] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(90);
  const [joinedNicknames, setJoinedNickname] = useState([]);
  const [joinID, setjoinID] = useState([]);
  const [targetGamepin, settargetGamepin] = useState(null);
  const [scores, setScores] = useState({});

  

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

  

  useEffect(() => {
    const loadUsers = async () => {
      if (!quizStarted) {
        loadusers();
      }
    };
    const interval = setInterval(loadUsers, 1000); 
    return () => clearInterval(interval); 
  }, [quizStarted]); 
  

  useEffect(()=>{
    fetchquestion();
  },[])

  useEffect(() => {
    const start = async () => {
      try {
        const result = await axios.get("http://localhost:8080/getstart");
        const arraySize = result.data.length;
        let check = result.data[arraySize - 1].checkstatus;
        if (check === 'yes') {
          setQuizStarted(true);
          
        } else {
          console.log("false");
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    const intervalId = setInterval(() => {
      start();
    }, 1000);

    return () => clearInterval(intervalId);
  }, []); 



  useEffect(() => {
    const fetchScoreData = async () => {
      const scoreData = {};
      for (const userid of joinID) {
        try {
          const response = await axios.get(`http://localhost:8080/getScore/${userid}`);
          scoreData[userid] = response.data;
        } catch (error) {
          console.error('Error fetching score for userid:', userid, error);
          scoreData[userid] = null;
        }
      }
      setScores(scoreData);
      console.log(scoreData);
    };

   fetchScoreData();
  }, [showScore]);


  const loadusers = async () => {
   
    try {
      const result = await axios.get("http://localhost:8080/QuizPlay");
      console.log(result);
      const arraySize = result.data.length;
      let t = result.data[arraySize - 1].gamepin;
      settargetGamepin(t);
      const filteredData = result.data.filter(item => item.gamepin == t);
      const nicknames = filteredData.map(item => item.nickname);
      const joinid = filteredData.map(item => item.id);
      setJoinedNickname(nicknames);
      setjoinID(joinid);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchquestion = async() =>{
    const result = await axios.get("http://localhost:8080/getquestion");
      console.log(result);
      const Size = result.data.length;
      
      for(let i=0;i<10;i++)
      {
        if(Size>10)
        {
          questions[i] = 
          {
            question: result.data[Size-10+i].question,
            answers: {
              answer_a: result.data[Size-10+i].option_a,
              answer_b: result.data[Size-10+i].option_b,
              answer_c: result.data[Size-10+i].option_c,
              answer_d:result.data[Size-10+i].option_d,
              answer_e: result.data[Size-10+i].option_e,
              answer_f: result.data[Size-10+i].option_f
            },
            correctAnswer: result.data[Size-10+i].correctAnswer
          }
        }
        else{
          questions[i] = 
          {
            question: result.data[i].question,
            answers: {
              answer_a: result.data[i].option_a,
              answer_b: result.data[i].option_b,
              answer_c: result.data[i].option_c,
              answer_d:result.data[i].option_d,
              answer_e: result.data[i].option_e,
              answer_f: result.data[i].option_f
            },
            correctAnswer: result.data[i].correctAnswer
          }
        }
        
      }
  }

  

  const handleAnswerButtonClick = async (selectedOption) => {
    const currentQuestion = questions[currentQuestionIndex];
    if (!currentQuestion) {
      return;
    }

    setSelectedOption(selectedOption);
    const name=localStorage.getItem('name');
    console.log(name);
    console.log(joinedNicknames);
    

    if (selectedOption === currentQuestion.correctAnswer) {
      console.log("Correct!");
      const isNameJoined = joinedNicknames.some(nickname => 
        nickname.trim().toLowerCase() === name
      );
      console.log(targetGamepin);
      console.log(joinID);


      if (isNameJoined) {
        try {
          const userResponse = await axios.get(`http://localhost:8080/getUserIdByNickname/${targetGamepin}/${name}`);
          const userId = userResponse.data;

          await axios.post(`http://localhost:8080/updateScore/${userId}`);
          console.log('Score updated successfully for user ID:', userId);
        } catch (error) {
          console.error('Error updating score for user ID:', error);
        }
      } else {
        console.log('Name not found in joined nicknames.');
      }
    } else {
      console.log("Incorrect!");
    }
  };


  const handleNextButtonClick = () => {
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
    }else{
      setquizend(true);
    }
  };
  const handleEndQuiz = () => {
    setShowScore(true);
    setquizend(true);
    
  };
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  


  return (
    <div className="app">
      {quizStarted ? (!quizend ? (
        <>
          <div className="time-left">Time Left: {formatTime(timeLeft)}</div>
          <div className="question-section">
            <div className="question-count">
              <span>Question {currentQuestionIndex + 1}</span>/{questions.length}
            </div>
            <div className="question-text">
              {questions.length > 0 && questions[currentQuestionIndex]?.question}
            </div>
          </div>
          <div className="answer-section">
            {questions.length > 0 && (
              <>
                {Object.keys(questions[currentQuestionIndex]?.answers).map((key, index) => {
                  const answer = questions[currentQuestionIndex]?.answers[key];
                  if (answer !== null) {
                    return (
                      <button
                        key={index}
                        onClick={() => handleAnswerButtonClick(key)}
                        className={selectedOption === key ? 'selected' : ''}
                      >
                        {answer}
                      </button>
                    );
                  }
                  return null;
                })}
              </>
            )}
          </div>
          <div className="next-button">
            <button onClick={handleNextButtonClick} disabled={!selectedOption}>
              Next
            </button>
          </div>
        </>
      ) : (
        timeLeft !== 0 ? (
          <div className="waiting-section">
            Waiting for the {timeLeft} seconds to end quiz...
          </div>
        ) : (
          <div className="score-section">
             scored out of {questions.length}
            <ul>
              {joinedNicknames.map((nickname, index) => (
                <li key={index}>
                  {nickname} - Score: {scores[joinID[index]] !== undefined ? scores[joinID[index]] : 'Loading...'}
                </li>
              ))}
            </ul>
          </div>
        )
      )) : (
        joinedNicknames.length > 0 && (
          <div className="joined-names-section">
            <h1>Please wait for the quiz to start...</h1>
            <h3>Joined Names:</h3>
            <ul>
              {joinedNicknames.map((user, index) => (
                <li key={index}>{user}</li>
              ))}
            </ul>
          </div>
        )
      )}
    </div>
  );
};

export default QuizPlay;

