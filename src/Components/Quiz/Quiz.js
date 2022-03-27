import React from "react";
import Question from "../Question/Question.js";

export default function Quiz(props){
    const [allUserResponses, setAllUserResponses] = React.useState([...Array(props.questions.length).fill("unanswered")]);
    const [showCorrect, setShowCorrect] = React.useState(false);
    console.log(props.questions);

    function handleCompletion(){
        if(showCorrect){
            props.reset();
        }else{
            setShowCorrect(true);
        }
    }
    return (
        <div className="quiz">
            {
                [...Array(props.questions.length)].map((_, index)=>{
                    return <Question {...props.questions[index]}
                    key={props.questions[index].id}
                    id={props.questions[index].id}
                    setResponse={setAllUserResponses}
                    debug={allUserResponses}
                    showCorrect={showCorrect}
                     />;
                })
               
            }
             <button onClick={handleCompletion}>{showCorrect ? "Try again!" : "Show results!" }</button>
        </div>
    );
}