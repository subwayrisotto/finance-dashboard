import React, { useState } from "react";
import styles from "./Form.module.scss";
import expenseSources from "../../data/expenseSources";

function TransferForm(props) {
  const { selectedBox } = props;
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  return (
    <form className={styles.form}>
      <div className={styles.inputCtn}>
        <label htmlFor="amount">Amount:</label>
        <input type="number" id="amount" placeholder="Write amount..." />
      </div>

      <div className={styles.inputCtn}>
        <label htmlFor="from">From account:</label>
        <input type="text" id="from" placeholder="John Snow" />
      </div>

      <div className={styles.inputCtn}>
        <label htmlFor="to">To account:</label>
        <input type="text" id="to" placeholder="Megan Fox" />
      </div>

      <div className={styles.inputCtn}>
        <label htmlFor="date">Date:</label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
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

export default TransferForm;
