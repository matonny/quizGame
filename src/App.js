import React, {useState} from 'react'
import './App.css';
import Menu from './Components/Menu/Menu.js'
import Quiz from './Components/Quiz/Quiz.js'
import './Styles/global.css'

function App() {
  const [request, setRequest] = useState("")
  const [quizQuestions, setQuizQuestions] = useState("")


  React.useEffect(()=>{
    if(request){
      fetch(request)
        .then(res => res.json())
        .then(data => {
          const questionsWithID = data.results.map((entry, index)=> {
            return {
              ...entry,
              id: index
            }
          })
          console.log(questionsWithID)
          setQuizQuestions(questionsWithID)
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
