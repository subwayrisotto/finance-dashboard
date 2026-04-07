import React from "react";
import styles from "./CashOperationContainerComponent.module.scss";

function CashOperationContainer(props) {
  const { icon, title, description, onClick, iconBoxColor = "#fff" } = props;

  return (
    <div className={styles.cashOperationContainer} onClick={onClick}>
      <div className={styles.iconBox} style={{ backgroundColor: iconBoxColor }}>
        <img src={icon} alt={title} />
      </div>

      <div className={styles.textCtn}>
        <p className={styles.title}>{title}</p>
        <p className={styles.description}>{description}</p>
      </div>
    </div>
  );
}

export default CashOperationContainer;
