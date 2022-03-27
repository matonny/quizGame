import React from "react";
import Select from "../Select/Select.js";
import styles from "./Form.module.css";


export default function Form(props){
    const [quizSetting, setQuizSetting] = React.useState(
        {
            amount: "",
            difficulty:""
        }
    );
    const [displayError, setDisplayError] = React.useState(false);

    console.log(quizSetting);
    const difficulty = {
        id: "difficulty",
        label: "Choose difficulty",
        values: ["any", "easy", "medium", "hard"]
    };
    const amount = {
        id:"amount",
        label: "Choose number of questions",
        values: [1,2,3,4,5,6,7,8,9,10]
    };  
    function handleChange(event){
        setDisplayError(false);
        const {name, value} = event.target;
        setQuizSetting(prevQuizSetting => {
            return{
            ...prevQuizSetting,
            [name]: value
            };
        });
    }
    function handleSubmit(event){
        event.preventDefault();
        const completedForm = 
            Object.keys(quizSetting)
            .map((key)=>{return quizSetting[key]!="";})
            .every(x=>x);
        if(completedForm){
            makeRequest();
        }else{
            setDisplayError(true);
        }
    }
    function makeRequest(){
        let request = "https://opentdb.com/api.php?";
        request += `amount=${quizSetting.amount}`;
        request += (quizSetting.difficulty != "any" ? `&difficulty=${quizSetting.difficulty}` : "");
        props.sendQuestions(request);
            
    }
    return(
        <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.fieldsWrapper}>
                <Select {...difficulty} value={quizSetting.difficulty} onChange={handleChange}/>
                <Select {...amount} value={quizSetting.amount} onChange={handleChange}/>
            </div>
            <p className={styles.error}>{displayError ? "The form is incomplete!" : ""}</p>
            <input className={styles.submit} type="submit"></input>
        </form>
    );
}