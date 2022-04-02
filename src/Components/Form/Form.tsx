import React, { useState } from "react";
import { Select } from "../Select/Select";
import styles from "./Form.module.css";
import { Question } from "../../Common/types";
import he from "he";

interface FormProps {
  sendQuestions: (questions: Question[]) => void;
}
export interface Root {
  response_code: number;
  results: Result[];
}
export interface Result {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

function Form(props: FormProps) {
  const [quizSetting, setQuizSetting] = useState({
    amount: "",
    difficulty: "",
  });
  const [displayError, setDisplayError] = useState(false);

  console.log(quizSetting);

  // difficulty and amount objects represent the possible options
  // in the created form.
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

  /**
   * Changes quiz settings based on current values of the form.
   * @param event change of form
   */
  function handleChange(event: React.FormEvent<HTMLFormElement>) {
    setDisplayError(false);
    const { name, value } = event.currentTarget;
    setQuizSetting((prevQuizSetting) => {
      return {
        ...prevQuizSetting,
        [name]: value,
      };
    });
  }
  /**
   * If the form is completed makes a request to get questions,
   * processes them and sends to parent using hook.
   * @param event on submit
   */
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const completedForm = Object.values(quizSetting)
      .map((value) => {
        return value != "";
      })
      .every((x) => x);

    if (completedForm) {
      const requestUrl = getRequestUrl();
      getRawQuestions(requestUrl)
        .then((res) => res.json())
        .then((data: Root) => {
          const rawQestions = data.results.map((entry: Result, index: number) => {
            return {
              question: he.decode(entry.question),
              correctAnswer: he.decode(entry.correct_answer),
              wrongAnswers: entry.incorrect_answers.map((ans: string) =>
                he.decode(ans)
              ),
              id: index,
            };
          });
          props.sendQuestions(rawQestions.map(prepareQuestion));
        });

    } else {
      setDisplayError(true);
    }
  }

  /**
   * Creates Request URL based on quiz setting (number of
   * questions and difficulty)
   * @returns {string} Request URL based on quiz setting
   */
  function getRequestUrl() {
    const difficultyParam =
      quizSetting.difficulty != "any"
        ? `&difficulty=${quizSetting.difficulty}`
        : "";
    return `https://opentdb.com/api.php?amount=${quizSetting.amount}${difficultyParam}`;
  }

  /**
   * Makes a request to the Trivia API to receive questions.
   * @param {string} requestUrl request with chosen settings.
   * @returns server response.
   */
  async function getRawQuestions(requestUrl: string) {
    const questions = await fetch(requestUrl);
    return questions;
  }
  
  /**
   * Takes raw data in the question and processes it
   * - stores all answers in single array
   * - puts correct answer at random place of that array
   * - adds ID to each answer
   * @param question
   * @returns {Question} question matching Question interface
   */
  function prepareQuestion(question: {
    wrongAnswers: string[];
    correctAnswer: string;
    question: string;
    id: number;
  }): Question {
    const allAnswers = addAtRandomPlace(
      question.wrongAnswers,
      question.correctAnswer
    );
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

  /**
   * Creates new array with the new element placed at
   * random position of the original array
   * @param originalArray
   * @param newElement
   * @returns New array with the element added at random position 
   * of original array
   */
  function addAtRandomPlace(originalArray: string[], newElement: string) {
    const newElementPosition = Math.floor(
      Math.random() * (originalArray.length + 1)
    );

    const newArray = originalArray
      .slice(0, newElementPosition)
      .concat([newElement])
      .concat(originalArray.slice(newElementPosition));

    return newArray;
  }
  return (
    <form onSubmit={handleSubmit}>
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
