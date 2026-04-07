import React from "react";
import styles from "./Form.module.scss";
import expenseSources from "../../data/expenseSources";

function ExpenseForm(props) {
  const { selectedBox } = props;
  return (
    <form className={styles.form}>
      <div className={styles.inputCtn}>
        <label htmlFor="amount">Amount:</label>
        <input type="number" id="amount" placeholder="Write amount..." />
      </div>

      <div className={styles.inputCtn}>
        <label htmlFor="source">Source:</label>
        <select id="source">
          <option value="">Select source</option>
          {expenseSources.map((is) => {
            return (
              <option value={is.value} key={is.id}>
                {is.text}
              </option>
            );
          })}
        </select>
      </div>

      <div className={styles.inputCtn}>
        <label htmlFor="date">Date:</label>
        <input type="date" id="date" />
      </div>

      <div className={styles.inputCtn}>
        <label htmlFor="description">Description:</label>
        <input
          type="text"
          id="description"
          placeholder="Write description..."
        />
      </div>

      <button className={styles.submitFormBtn}>Add {selectedBox}</button>
    </form>
  );
}

export default ExpenseForm;
