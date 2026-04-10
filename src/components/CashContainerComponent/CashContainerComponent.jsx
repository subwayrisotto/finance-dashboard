import React, { useState } from "react";
import styles from "./CashContainerComponent.module.scss";

function CashContainer(props) {
  const { title, amount, color = "#000", prevAmount = 0 } = props;
  const [isHide, setIsHide] = useState(false);

  function calcPercentageDifference(prev, current) {
    if (prev === 0) return 0;
    return (((current - prev) / prev) * 100).toFixed(1);
  }

  const percDiff = calcPercentageDifference(prevAmount, amount);
  const isPositive = percDiff >= 0;

  const handleHide = () => {
    setIsHide((prev) => !prev);
  };

  return (
    <div className={styles.cashContainer}>
      <div className={styles.topCtn}>
        <p className={styles.title}>{title}</p>
        <div className={styles.hideCtn} onClick={handleHide}>
          {isHide ? (
            <img src="/assets/icons/hide.svg" alt="Hide" />
          ) : (
            <img src="/assets/icons/show.svg" alt="Show" />
          )}
        </div>
      </div>
      <div className={styles.ctn}>
        <p className={styles.amount} style={{ color: color }}>
          {isHide
            ? `$${amount
                .toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })
                .replace(/\d/g, "*")}`
            : `$${amount.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}`}
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
