import React, {useState} from "react";
import he from "he";
import "./App.css";
import Menu from "./Components/Menu/Menu.js";
import Quiz from "./Components/Quiz/Quiz.js";
import "./Styles/global.css";

function App() {
  const [request, setRequest] = useState("");
  const [quizQuestions, setQuizQuestions] = useState();

  function prepareQuestion(question){
    const incorrectAnswerNumber = question.wrongAnswers.length;
    const goodAnswerPosition = Math.floor(Math.random()*(incorrectAnswerNumber+1));
    const allAnswers = 
        question.wrongAnswers.slice(0, goodAnswerPosition)
        .concat([question.correctAnswer])
        .concat(question.wrongAnswers.slice(goodAnswerPosition));
    const idAnswers = allAnswers.map((answer, index) =>{
        return({
        answer: answer,
        id: index
            }
        );
    });
    return {
        allAnswers: idAnswers,
        questionText: question.question,
        correctAnswer: question.correctAnswer,
        id: question.id
    };
}
  React.useEffect(()=>{
    if(request){
      fetch(request)
        .then(res => res.json())
        .then(data => {
          const questionsWithID = data.results.map((entry, index)=> {
            return {  
              question: he.decode(entry.question),
              correctAnswer: he.decode(entry.correct_answer),
              wrongAnswers: entry.incorrect_answers.map((ans)=> he.decode(ans)),
              id: index
            };
          });

          setQuizQuestions(questionsWithID.map(prepareQuestion));
        });
    }
  }, [request]);
  return (
    <div className="App">
      { !quizQuestions ? 
        <Menu sendQuestions={setRequest} /> : 
        <Quiz questions={quizQuestions} reset={setQuizQuestions} />}
    </div>
  );
}

export default App;
