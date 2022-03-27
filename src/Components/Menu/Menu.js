import React from "react";
import styles from "./Menu.module.css";

import Form from "../Form/Form.js";

export default function Menu(props){
    return(
        <div className={styles.quiz}>
            <h1 className={styles.title}>Quizzer</h1>
            <Form sendQuestions={props.sendQuestions}/>
        </div>
    );
}