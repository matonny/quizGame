import React, { MouseEventHandler } from "react";
import styles from "./Answer.module.css";
import clsx from "clsx";

function Answer(props:{
  chosen: boolean;
  showCorrect: boolean;
  correct: boolean;
  text: string;
  handleClick: MouseEventHandler<HTMLParagraphElement>;
}) {
  const className = clsx(
    styles.answer,
    props.chosen && styles.chosen,
    props.showCorrect && props.chosen && styles.wrong,
    props.showCorrect && props.correct && styles.correct
  );

  return (
    <p className={className} onClick={props.handleClick}>
      {[props.text]}
    </p>
  );
}
export { Answer };
