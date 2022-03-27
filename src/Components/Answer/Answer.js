import React from "react";
import styles from "./Answer.module.css";

export default function Answer(props){
    let className = `${styles.answer} `;
    
    if(props.chosen){
        if(props.showCorrect){
            if(props.correct){
                className += styles.correct;
            }else{
                className += styles.wrong;
            }
        }else{
            className += styles.chosen;
        }
    }else{
        if(props.showCorrect && props.correct){
            className += styles.correct;
        }
    }
    return(
        <p className={className}
            onClick={props.handleClick}>
            {[props.text]}
        </p>
    );
}