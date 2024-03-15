// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './Quiz.css'

// const QuizPlay = () => {
  
//   const [questions, setQuestions] = useState([]);
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [score, setScore] = useState(0);
//   const [showScore, setShowScore] = useState(false);
//   const [selectedOption, setSelectedOption] = useState(null);
//   const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);
//   const [isRestart, setIsRestart] = useState(false);
//   const [timeLeft, setTimeLeft] = useState(120);

  

//   useEffect(() => {
//     let timer;
//     if (timeLeft > 0 && !showScore) {
//       timer = setTimeout(() => {
//         setTimeLeft(timeLeft - 1);
//       }, 1000);
//     } else if (timeLeft === 0) {
//       handleEndQuiz();
//     }
//     return () => clearTimeout(timer);
//   }, [timeLeft, showScore]);

//   const handleAnswerButtonClick = (selectedOption, answer) => {
//     const currentQuestion = questions[currentQuestionIndex];
//     if (!currentQuestion) {
//       return;
//     }

//     const correctAnswersMap = {
//       "answer_a": currentQuestion.correct_answers.answer_a_correct === "true" ? currentQuestion.answers.answer_a : null,
//       "answer_b": currentQuestion.correct_answers.answer_b_correct === "true" ? currentQuestion.answers.answer_b : null,
//       "answer_c": currentQuestion.correct_answers.answer_c_correct === "true" ? currentQuestion.answers.answer_c : null,
//       "answer_d": currentQuestion.correct_answers.answer_d_correct === "true" ? currentQuestion.answers.answer_d : null,
//       "answer_e": currentQuestion.correct_answers.answer_e_correct === "true" ? currentQuestion.answers.answer_e : null,
//       "answer_f": currentQuestion.correct_answers.answer_f_correct === "true" ? currentQuestion.answers.answer_f : null,
//     };

//     const correctAnswer = correctAnswersMap[selectedOption];
//     const isCorrect = answer === correctAnswer;
//     if (isCorrect) {
//       setScore(score + 1);
//     }
//     setSelectedOption(selectedOption);
//     setIsAnswerCorrect(isCorrect);
//   };

//   const handleNextButtonClick = () => {
//     if (currentQuestionIndex + 1 < questions.length) {
//       setCurrentQuestionIndex(currentQuestionIndex + 1);
//       setSelectedOption(null);
//       setIsAnswerCorrect(false);
//     } else {
//       setShowScore(true);
//     }
//   };

//   const restartQuiz = () => {
//     setScore(0);
//     setCurrentQuestionIndex(0);
//     setShowScore(false);
//     setSelectedOption(null);
//     setIsRestart(!isRestart);
//     setTimeLeft(120);
//   };

//   const handleEndQuiz = () => {
//     setShowScore(true);
//   };

//   const formatTime = (time) => {
//     const minutes = Math.floor(time / 60);
//     const seconds = time % 60;
//     return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
//   };

//   return (
//     <div>
//       {showScore ? (
//         <div className="score-section">
//           You scored {score} out of {questions.length}
//           <button onClick={restartQuiz}>Restart Quiz</button>
//         </div>
//       ) : (
//         <>
//           <div>Time Left: {formatTime(timeLeft)}</div>
//           <div className="question-section">
//             <div className="question-count">
//               <span>Question {currentQuestionIndex + 1}</span>/{questions.length}
//             </div>
//             <div className="question-text">
//               {questions.length > 0 && questions[currentQuestionIndex]?.question}
//             </div>
//           </div>
//           <div className="answer-section">
//             {questions.length > 0 && (
//               <>
//                 {questions[currentQuestionIndex]?.answers && Object.keys(questions[currentQuestionIndex]?.answers).map((key, index) => {
//                   const answer = questions[currentQuestionIndex]?.answers[key];

//                   if (answer !== null) {
//                     return (
//                       <button
//                         key={index}
//                         onClick={() => handleAnswerButtonClick(key, answer)}
//                         className={selectedOption === key ? "selected" : ''}
//                       >
//                         {answer}
//                       </button>
//                     );
//                   }
//                   return null;
//                 })}
//               </>
//             )}
//           </div>
//           <div className="next-button">
//             <button onClick={handleNextButtonClick} disabled={!selectedOption}>
//               Next
//             </button>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default QuizPlay;
