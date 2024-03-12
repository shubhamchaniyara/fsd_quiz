import React, { useState, useEffect } from 'react';
import axios from 'axios';
//import CheckLimit from './CheckLimit';
// import JoinQuiz from './JoinQuiz';
//import './Quiz.css';

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

      const handleStartQuiz = () => {
        setQuizStarted(true);
      };

      const handleAnswerButtonClick = (selectedOption, answer) => {
        const currentQuestion = questions[currentQuestionIndex];
        if (!currentQuestion) {
          return;
        }
        const correctAnswersMap = {
          "answer_a": currentQuestion.correct_answers.answer_a_correct === "true" ? currentQuestion.answers.answer_a : null,
          "answer_b": currentQuestion.correct_answers.answer_b_correct === "true" ? currentQuestion.answers.answer_b : null,
          "answer_c": currentQuestion.correct_answers.answer_c_correct === "true" ? currentQuestion.answers.answer_c : null,
          "answer_d": currentQuestion.correct_answers.answer_d_correct === "true" ? currentQuestion.answers.answer_d : null,
          "answer_e": currentQuestion.correct_answers.answer_e_correct === "true" ? currentQuestion.answers.answer_e : null,
          "answer_f": currentQuestion.correct_answers.answer_f_correct === "true" ? currentQuestion.answers.answer_f : null,
        };
        const correctAnswer = correctAnswersMap[selectedOption];
        const isCorrect = answer === correctAnswer;
        if (isCorrect) {
          setScore(score + 1);
        }
        setSelectedOption(selectedOption);
        setIsAnswerCorrect(isCorrect);
      };
      const handleNextButtonClick = () => {
        if (currentQuestionIndex + 1 < questions.length) {
          setCurrentQuestionIndex(currentQuestionIndex + 1);
          setSelectedOption(null);
          setIsAnswerCorrect(false);
        } else {
          setShowScore(true);
        }
      };
      const restartQuiz = () => {
        setScore(0);
        setCurrentQuestionIndex(0);
        setShowScore(false);
        setQuestions([]);
        setisRestart(!isRestart);
        setTimeLeft(120); 
      };
      const handleEndQuiz = () => {
        setShowScore(true);
      };
      const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
      };
    

      return (
        <div className="app">
          {!quizStarted && (
            <>
              {gamePin && <p>Game Pin: {gamePin}</p>}
              <CheckLimit />
            </>
          )}
          {!quizStarted && (
            <button onClick={handleStartQuiz}>Start Quiz</button>
          )}
          {quizStarted && !showScore ? (
            <>
              <div>Time Left: {formatTime(timeLeft)}</div>
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
                    {questions[currentQuestionIndex]?.answers && Object.keys(questions[currentQuestionIndex]?.answers).map((key, index) => {
                      const answer = questions[currentQuestionIndex]?.answers[key];
                      if (answer !== null) {
                        return (
                          <button
                            key={index}
                            onClick={() => handleAnswerButtonClick(key, answer)}
                            className={answer === questions[selectedOption] ? (isAnswerCorrect ? 'correct' : 'incorrect') : ''}
                            disabled={selectedOption}
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
            showScore && (
              <div className="score-section">
                You scored {score} out of {questions.length}
                <button onClick={restartQuiz}>Restart Quiz</button>
              </div>
            )
          )}
          {/* <JoinQuiz gamePin={gamePin} /> */}
          {joinedNicknames.length > 0 && (
            <div>
              <h3>Joined Names:</h3>
              <ul>
                {joinedNicknames.map((user, index) => (
                  <li key={index}>{user.nickname}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      );
};