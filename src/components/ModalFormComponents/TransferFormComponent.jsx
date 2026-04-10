import React, { useState } from "react";
import styles from "./Form.module.scss";
import expenseSources from "../../data/expenseSources";

function TransferForm(props) {
  const { selectedBox, onAddTransaction, onClose } = props;

  const [formData, setFormData] = useState({
    amount: 0,
    from: "",
    to: "",
    date: new Date().toISOString().split("T")[0],
    description: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTransaction = {
      id: crypto.randomUUID(),
      type: selectedBox,
      amount: formData.amount,
      from: formData.from,
      to: formData.to,
      date: formData.date,
      description: formData.description,
      createdAt: new Date().toISOString(),
    };

    if (!formData.amount) return;

    onAddTransaction(newTransaction);
    onClose();
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.inputCtn}>
        <label htmlFor="amount">Amount:</label>
        <input
          type="number"
          id="amount"
          placeholder="Write amount..."
          value={formData.amount}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, amount: e.target.value }))
          }
        />
      </div>

      <div className={styles.inputCtn}>
        <label htmlFor="from">From account:</label>
        <input
          type="text"
          id="from"
          placeholder="John Snow"
          value={formData.from}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, from: e.target.value }))
          }
        />
      </div>

      <div className={styles.inputCtn}>
        <label htmlFor="to">To account:</label>
        <input
          type="text"
          id="to"
          placeholder="Megan Fox"
          value={formData.to}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, to: e.target.value }))
          }
        />
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

export default TransferForm;
