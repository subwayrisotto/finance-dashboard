import React from "react";
import styles from "./TransactionsTableComponent.module.scss";
import AvatarTransaction from "../AvatarTransactionComponent/AvatarTransactionComponent";
import icons from "../../data/icons";

function TransactionsTable(props) {
  const { transactions } = props;
  console.log(transactions);
  return (
    <div className={styles.transactionsTableCtn}>
      <div className={styles.headerCtn}>
        <p className={styles.header}>Last transactions</p>
        <p className={styles.subHeader}>Check your last transactions</p>
      </div>

      <table className={styles.transactionsTable}>
        <thead className={styles.transactionsThead}>
          <tr>
            <th className={styles.transactionsTh}>Description</th>
            <th className={styles.transactionsTh}>Method</th>
            <th className={styles.transactionsTh}>Date</th>
            <th className={styles.transactionsTh}>Amount</th>
            <th className={styles.transactionsTh}></th>
          </tr>
        </thead>

        <tbody className={styles.transactionsTbody}>
          {transactions.map((transaction) => {
            const isIncome = transaction.type === "income";
            const updAmount = isIncome
              ? `+$${transaction.amount}`
              : `-$${transaction.amount}`;

            const displayTitle =
              transaction.type === "income"
                ? transaction.source
                : transaction.title;

            return (
              <tr className={styles.transactionsTr}>
                <td className={styles.transactionsTd}>
                  <AvatarTransaction title={displayTitle} icons={icons} />
                  <p className={styles.title}>{displayTitle}</p>
                </td>
                <td className={styles.transactionsTd}>
                  <p className={styles.account}>
                    {transaction.account.charAt(0).toUpperCase() +
                      transaction.account.slice(1)}
                  </p>
                </td>
                <td className={styles.transactionsTd}>
                  <p className={styles.date}>{transaction.date}</p>
                </td>
                <td className={styles.transactionsTd}>
                  <p style={isIncome ? { color: "#17B26A" } : {}}>
                    {updAmount}
                  </p>
                </td>
                <td className={styles.transactionsTd}>
                  <img src="/assets/icons/transactionSetting.svg" alt="Icon" />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default TransactionsTable;
