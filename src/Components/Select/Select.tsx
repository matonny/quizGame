import React, { ChangeEventHandler } from "react";
import styles from "./Select.module.css";

function Select(props:{
  label: string;
  id: string;
  possibleValues: string[];
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>)=>void;
}) {
  return (
    <div className={styles.selectWrapper}>
      <label className={styles.label} htmlFor={props.id}>
        {props.label}
      </label>
      <select
        className={styles.select}
        name={props.id}
        onChange={props.onChange}
      >
        <option value="">choose</option>
        {props.possibleValues.map((value) => {
          return (
            <option key={value} value={value}>
              {value}
            </option>
          );
        })}
      </select>
    </div>
  );
}
export { Select };
