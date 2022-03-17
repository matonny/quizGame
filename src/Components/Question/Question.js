import React from 'react'
import Answer from '../Answer/Answer'

export default function Question(prop){
    const [userAnswer, setUserAnswer] = React.useState(-1);
    const incorrectAnswerNumber = prop.incorrect_answers.length;
    const goodAnswerPosition = Math.floor(Math.random()*(incorrectAnswerNumber+1));
    const allAnswers = prop.incorrect_answers;
    allAnswers.splice(goodAnswerPosition, 0, prop.correct_answer)
    const idAnswers = allAnswers.map((answer, index) =>{
        return({
        answer: answer,
        id: index
            }
        )
    })
    console.log(idAnswers)
    return (
        <div>
            <h2>{prop.question}</h2>
            <ul>
                {
                idAnswers.map((answer)=>{
                    console.log(idAnswers.length)
                    return <Answer 
                        correct={prop.correct_answer===answer.answer}
                        text={answer.answer}
                        chosen={userAnswer===answer.id}
                        handleClick={()=>setUserAnswer(answer.id)}/>
                })}
            </ul>
        </div>   
    )
}
