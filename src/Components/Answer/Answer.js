import React from 'react'
import styles from './Answer.module.css'

export default function Answer(props){
    return(
        <p className={`${styles.answer} ${props.chosen ? styles.chosen : ""}`}
            onClick={props.handleClick}>
            {[props.text]}
        </p>
    )
}