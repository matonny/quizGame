import React, {useState} from 'react'
import './App.css';
import Menu from './Components/Menu/Menu.js'
import Quiz from './Components/Quiz/Quiz.js'
import './Styles/global.css'

function App() {
  const [request, setRequest] = useState("")
  const [quizQuestions, setQuizQuestions] = useState()
  
  const re = new RegExp('(&quot;|&#039;|$amp;)', 'g' )


  function replacer(phraseToReplace){
    switch (phraseToReplace){
      case "&quot;":
        return "\"";
      case "&#039;":
        return "'";  
     default:
      return ""
    }
  }
  function prepareQuestion(question){
    const incorrectAnswerNumber = question.wrongAnswers.length;
    const goodAnswerPosition = Math.floor(Math.random()*(incorrectAnswerNumber+1));
    const allAnswers = 
        question.wrongAnswers.slice(0, goodAnswerPosition).
        concat([question.correctAnswer]).
        concat(question.wrongAnswers.slice(goodAnswerPosition))
    const idAnswers = allAnswers.map((answer, index) =>{
        return({
        answer: answer,
        id: index
            }
        )
    })
    return {
        allAnswers: idAnswers,
        questionText: question.question,
        correctAnswer: question.correctAnswer
    }
}
  React.useEffect(()=>{
    if(request){
      fetch(request)
        .then(res => res.json())
        .then(data => {
          const questionsWithID = data.results.map((entry, index)=> {
            return {  
              question: entry.question.replace(re, replacer),
              correctAnswer: entry.correct_answer.replace(re, replacer),
              wrongAnswers: entry.incorrect_answers.map((ans)=> ans.replace(re, replacer)),
              id: index
            }
          })

          setQuizQuestions(questionsWithID.map(prepareQuestion))
        })
    }
  }, [request])
  console.log(quizQuestions)
  return (
    <div className="App">
      { !quizQuestions ? 
        <Menu sendQuestions={setRequest} /> : 
        <Quiz questions={quizQuestions} />}
    </div>
  );
}

export default App;
