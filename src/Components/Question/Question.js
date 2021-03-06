import React, { useState, useEffect } from "react";
import { Answer } from "../Answer/Answer";
import styles from "./Question.module.css";

function Question(props) {
  const [userAnswer, setUserAnswer] = useState(-1);

  useEffect(() => {
    props.setResponse((prevAllAnswers) => {
      prevAllAnswers[props.id] = props.allAnswers[userAnswer]
        ? props.allAnswers[userAnswer].answer
        : "unanswered";
      return prevAllAnswers;
    });
  }, [props, userAnswer]);

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.questionText}>
        {" "}
        {props.id + 1}. {props.questionText}
      </h2>
      <ul className={styles.answerList}>
        {props.allAnswers.map((answer) => {
          return (
            <Answer
              key={answer.id}
              correct={props.correctAnswer === answer.answer}
              text={answer.answer}
              chosen={userAnswer === answer.id}
              handleClick={
                props.showCorrect ? () => {} : () => setUserAnswer(answer.id)
              }
              showCorrect={props.showCorrect}
            />
          );
        })}
      </ul>
    </div>
  );
}
export { Question };
