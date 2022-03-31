import React, {useState} from "react";
import "./App.css";
import {Menu} from "./Components/Menu/Menu";
import {Quiz} from "./Components/Quiz/Quiz";

function App() {
  const [quizQuestions, setQuizQuestions] = useState();

  return (
    <div className="App">
      { !quizQuestions ? 
        <Menu sendQuestions={setQuizQuestions} /> : 
        <Quiz questions={quizQuestions} reset={setQuizQuestions} />}
    </div>
  );
}

export {App};