import React from "react";
import styles from "./ModalComponent.module.scss";
import IncomeForm from "../ModalFormComponents/IncomeFormComponent";
import ExpenseForm from "../ModalFormComponents/ExpenseFormComponent";
import TransferForm from "../ModalFormComponents/TransferFormComponent";

function Modal(props) {
  const { onClose, selectedBox, onAddTransaction } = props;

  const handleDisplayForm = () => {
    switch (selectedBox) {
      case "income":
        return (
          <IncomeForm
            selectedBox={selectedBox}
            onAddTransaction={onAddTransaction}
            onClose={onClose}
          />
        );
      case "expense":
        return <ExpenseForm selectedBox={selectedBox} />;
      case "transfer":
        return <TransferForm selectedBox={selectedBox} />;
      default:
        return "Test";
    }
  };

  return (
    <>
      <div className={styles.overlay} onClick={onClose}>
        <div
          className={styles.modal}
          onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
        >
          <button className={styles.closeBtn} onClick={onClose}>
            <img src="/assets/icons/close.svg" alt="Close" />
          </button>
          <p className={styles.modalHeaderText}>Add new {selectedBox}</p>
          <div className={styles.form}>{handleDisplayForm()}</div>
        </div>
      </div>
    </>
  );
}

export default Modal;
