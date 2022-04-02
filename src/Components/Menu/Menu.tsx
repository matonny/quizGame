import React from "react";
import styles from "./Menu.module.css";
import {Question} from "../../Common/types";
import { Form } from "../Form/Form";

function Menu(props: {
  sendQuestions: (questions: Question[]) => void
}){
  return (
    <div className={styles.quiz}>
      <h1 className={styles.title}>Quizzer</h1>
      <Form sendQuestions={props.sendQuestions} />
    </div>
  );
}
export { Menu };
