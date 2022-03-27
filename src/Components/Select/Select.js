import React from "react";
import styles from "./Select.module.css";

export default function Select(props){
    return(
    <div className={styles.selectWrapper}>
        <label className={styles.label} htmlFor={props.id}> {props.label} </label>
        <select className={styles.select} name={props.id} onChange={props.onChange}>
            <option value="">choose</option>
            {
                props.values.map((value)=>{
                    return <option key={value} value={value}>{value}</option>;
                })
            }
        </select>
    </div>
    );
}