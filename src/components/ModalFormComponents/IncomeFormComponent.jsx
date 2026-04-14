import React, { useState } from "react";
import incomeSources from "../../data/incomeSources";
import styles from "./Form.module.scss";
import accounts from "../../data/accounts";
import { postNewTransaction } from "../../api";

function IncomeForm(props) {
  const { selectedBox, onAddTransaction, onClose } = props;
  const [formData, setFormData] = useState({
    amount: 0,
    source: "",
    account: "",
    date: new Date().toISOString().split("T")[0],
    description: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.amount || !formData.source) return;

    const newTransaction = {
      type: selectedBox,
      amount: formData.amount,
      source: formData.source,
      account: formData.account,
      date: formData.date,
      description: formData.description,
    };

    const savedTransaction = await postNewTransaction(newTransaction);

    if (savedTransaction) {
      onAddTransaction(savedTransaction);
    }

    onClose();
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.inputCtn}>
        <label htmlFor="amount">Amount:</label>
        <input
          type="text"
          id="amount"
          placeholder="Write amount..."
          value={formData.amount}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, amount: Number(e.target.value) }))
          }
        />
      </div>

      <div className={styles.inputCtn}>
        <label htmlFor="source">Source:</label>
        <select
          id="source"
          value={formData.source}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, source: e.target.value }))
          }
        >
          <option value="">Select source</option>
          {incomeSources.map((is) => {
            return (
              <option value={is.value} key={is.id}>
                {is.text}
              </option>
            );
          })}
        </select>
      </div>

      <div className={styles.inputCtn}>
        <label htmlFor="account">Account:</label>
        <select
          id="account"
          value={formData.account}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, account: e.target.value }))
          }
        >
          <option value="">Select account</option>
          {accounts.map((is) => {
            return (
              <option value={is.value} key={is.id}>
                {is.name}
              </option>
            );
          })}
        </select>
      </div>

      <div className={styles.inputCtn}>
        <label htmlFor="date">Date:</label>
        <input
          type="date"
          id="date"
          value={formData.date}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, date: e.target.value }))
          }
        />
      </div>

      <div className={styles.inputCtn}>
        <label htmlFor="description">Description:</label>
        <input
          type="text"
          id="description"
          placeholder="Write description..."
          value={formData.description}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, description: e.target.value }))
          }
        />
      </div>

      <button className={styles.submitFormBtn} type="submit">
        Add {selectedBox}
      </button>
    </form>
  );
}

export default IncomeForm;
