import React from "react";
import styles from "./CashContainerComponent.module.scss";

function CashContainer(props) {
  const { title, amount, color = "#000", prevAmount = 0 } = props;

  function calcPercentageDifference(prev, current) {
    if (prev === 0) return 0;
    return (((current - prev) / prev) * 100).toFixed(1);
  }

  const percDiff = calcPercentageDifference(prevAmount, amount);
  const isPositive = percDiff >= 0;

  return (
    <div className={styles.cashContainer}>
      <p className={styles.title}>{title}</p>
      <div className={styles.ctn}>
        <p className={styles.amount} style={{ color: color }}>
          $
          {amount.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </p>

        {percDiff !== 0 && (
          <div className={styles.percentageDifference}>
            {isPositive ? (
              <img src="/assets/icons/increased.svg" alt="Increased" />
            ) : (
              <img src="/assets/icons/decreased.svg" alt="Decreased" />
            )}{" "}
            <p>{Math.abs(percDiff) + "%"}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default CashContainer;
