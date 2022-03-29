import React, { useState } from "react";
import { Select } from "../Select/Select.js";
import styles from "./Form.module.css";
import he from "he";

function Form(props) {
  const [quizSetting, setQuizSetting] = useState({
    amount: "",
    difficulty: "",
  });
  const [displayError, setDisplayError] = useState(false);

  console.log(quizSetting);
  const difficulty = {
    id: "difficulty",
    label: "Choose difficulty",
    values: ["any", "easy", "medium", "hard"],
  };
  const amount = {
    id: "amount",
    label: "Choose number of questions",
    values: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  };
  function handleChange(event) {
    setDisplayError(false);
    const { name, value } = event.target;
    setQuizSetting((prevQuizSetting) => {
      return {
        ...prevQuizSetting,
        [name]: value,
      };
    });
  }
  async function handleSubmit(event) {
    event.preventDefault();
    const completedForm = Object.keys(quizSetting)
      .map((key) => {
        return quizSetting[key] != "";
      })
      .every((x) => x);
    if (completedForm) {
      const requestUrl = getRequestUrl();
      getRawQuestions(requestUrl)
        .then((res) => res.json())
        .then((data) => {
          const processedQuestions = data.results.map((entry, index) => {
            return {
              question: he.decode(entry.question),
              correctAnswer: he.decode(entry.correct_answer),
              wrongAnswers: entry.incorrect_answers.map((ans) =>
                he.decode(ans)
              ),
              id: index,
            };
          });
          props.sendQuestions(processedQuestions.map(prepareQuestion));
        });
    } else {
      setDisplayError(true);
    }
  }
  function getRequestUrl() {
    const difficultyParam =
      quizSetting.difficulty != "any"
        ? `&difficulty=${quizSetting.difficulty}`
        : "";
    return `https://opentdb.com/api.php?amount=${quizSetting.amount}${difficultyParam}`;
  }
  async function getRawQuestions(requestUrl) {
    const questions = await fetch(requestUrl);
    return questions;
  }
  function prepareQuestion(question) {
    const incorrectAnswerNumber = question.wrongAnswers.length;
    const goodAnswerPosition = Math.floor(
      Math.random() * (incorrectAnswerNumber + 1)
    );
    const allAnswers = question.wrongAnswers
      .slice(0, goodAnswerPosition)
      .concat([question.correctAnswer])
      .concat(question.wrongAnswers.slice(goodAnswerPosition));
    const idAnswers = allAnswers.map((answer, index) => {
      return {
        answer: answer,
        id: index,
      };
    });
    return {
      allAnswers: idAnswers,
      questionText: question.question,
      correctAnswer: question.correctAnswer,
      id: question.id,
    };
  }
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.fieldsWrapper}>
        <Select
          {...difficulty}
          value={quizSetting.difficulty}
          onChange={handleChange}
        />
        <Select
          {...amount}
          value={quizSetting.amount}
          onChange={handleChange}
        />
      </div>
      <p className={styles.error}>
        {displayError ? "The form is incomplete!" : ""}
      </p>
      <input className={styles.submit} type="submit"></input>
    </form>
  );
}
export { Form };
