import React from 'react'
import Question from '../Question/Question.js'

export default function Quiz(props){

    return (
        <div className='quiz'>
            {
                [...Array(props.questions.length)].map((_, index)=>{
                    return <Question {...props.questions[index]} key={props.questions[index].id} />
                })
            }
        </div>
    )
}