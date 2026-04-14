import React, { useState } from "react";
import styles from "./Form.module.scss";
import expenseSources from "../../data/expenseSources";
import accounts from "../../data/accounts";
import { postNewTransaction } from "../../api";

function ExpenseForm(props) {
  const { selectedBox, onAddTransaction, onClose } = props;
  const [formData, setFormData] = useState({
    amount: 0,
    title: "",
    account: "",
    category: "",
    date: new Date().toISOString().split("T")[0],
    description: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.amount || !formData.title) return;

    const newTransaction = {
      type: selectedBox,
      amount: Number(formData.amount),
      title: formData.title,
      account: formData.account,
      date: formData.date,
      category: formData.category,
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
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          placeholder="Write title..."
          value={formData.title}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, title: e.target.value }))
          }
        />
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
        <label htmlFor="category">Category:</label>
        <select
          id="category"
          value={formData.category}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, category: e.target.value }))
          }
        >
          <option value="">Select category</option>
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

export default ExpenseForm;
