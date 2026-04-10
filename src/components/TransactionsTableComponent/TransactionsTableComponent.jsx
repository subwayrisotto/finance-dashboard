import React from "react";
import styles from "./TransactionsTableComponent.module.scss";
import AvatarTransaction from "../AvatarTransactionComponent/AvatarTransactionComponent";
import icons from "../../data/icons";

function TransactionsTable(props) {
  const { transactions, onDeleteTransaction, isShortTable = true } = props;
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
            {!isShortTable && (
              <th className={styles.transactionsTh}>Transaction details</th>
            )}
            <th className={styles.transactionsTh}></th>
          </tr>
        </thead>

        <tbody className={styles.transactionsTbody}>
          {transactions.map((transaction) => {
            const isIncome = transaction.type === "income";
            const updAmount = isIncome
              ? `+$${transaction.amount.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}`
              : `-$${transaction.amount.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}`;

            const displayTitle =
              transaction.type === "income"
                ? transaction.source
                : transaction.title;

            return (
              <tr className={styles.transactionsTr}>
                <td className={styles.transactionsTd}>
                  <AvatarTransaction
                    title={
                      transaction.type === "transfer"
                        ? transaction.to
                        : displayTitle
                    }
                    icons={icons}
                  />
                  <p className={styles.title}>
                    {transaction.type === "transfer"
                      ? transaction.to
                      : displayTitle}
                  </p>
                </td>
                <td className={styles.transactionsTd}>
                  <p className={styles.account}>
                    {transaction.type === "transfer"
                      ? transaction.from
                      : transaction.account.charAt(0).toUpperCase() +
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
                {!isShortTable && (
                  <td className={styles.transactionsTd}>
                    <p className={styles.date}>{transaction.description}</p>
                  </td>
                )}
                <td
                  className={`${styles.transactionsTd} ${styles.deleteTransaction}`}
                  onClick={() => onDeleteTransaction(transaction.id)}
                >
                  <img src="/assets/icons/delete.svg" alt="Icon" />
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
