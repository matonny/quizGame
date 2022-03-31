import React, {useState} from "react";
import {Question} from "../Question/Question";
import styles from "./Quiz.module.css";

function Quiz(props){
    const [allUserResponses, setAllUserResponses] = useState([...Array(props.questions.length).fill("unanswered")]);
    const [showCorrect, setShowCorrect] = useState(false);
    console.log(props.questions);
    
    function handleCompletion(){
        if(showCorrect){
            props.reset("");
        }else{
            setShowCorrect(true);
        }
    }
    function calculateScore(){
        const correctAnswers = props.questions.filter((question) => {
            return allUserResponses[question.id] === question.correctAnswer;
        }).length;
        return correctAnswers + "/" + props.questions.length;
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
             <button className={styles.submit} onClick={handleCompletion}>{showCorrect ? "Try again!" : "Show results!" }</button>
             <p className={styles.score}>
             {showCorrect ? ("You scored " + calculateScore() + " point" + (props.questions.length > 1 ? "s." : "."))
             : ""}
             </p>

        </div>
    );
}
export {Quiz};