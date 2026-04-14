import React, { useEffect, useState } from "react";
import styles from "./TransactionsTableComponent.module.scss";
import AvatarTransaction from "../AvatarTransactionComponent/AvatarTransactionComponent";
import icons from "../../data/icons";

function TransactionsTable(props) {
  const { transactions, onDeleteTransaction, isShortTable = true } = props;

  const filters = isShortTable
    ? ["all", "income", "expense"]
    : ["all", "income", "expense", "transfer"];

  const [filterType, setFilterType] = useState("all");
  const [activeType, setActiveType] = useState("all");

  const filteredTransactions =
    filterType === "all"
      ? transactions
      : transactions.filter((t) => t.type === filterType);

  const handleSortTableByTransactionsType = (type) => {
    setActiveType(type);
    setFilterType(type);
  };

  const [editingId, setEditingId] = useState(null);

  const handleEdit = (id) => {
    setEditingId((prev) => (prev === id ? null : id));
  };

  const handleCloseEditing = () => {
    setEditingId(null);
  };

  return (
    <div className={styles.transactionsTableCtn}>
      <div className={styles.headerCtn}>
        <div className={styles.leftCtn}>
          <p className={styles.header}>Last transactions</p>
          <p className={styles.subHeader}>Check your last transactions</p>
        </div>

        <div className={styles.rightCtn}>
          <ul className={styles.filterTableList}>
            {filters.map((type) => (
              <li
                key={type}
                onClick={() => handleSortTableByTransactionsType(type)}
                className={`${styles.filterTableListItem} ${activeType === type ? styles.active : ""}`}
              >
                {type === "all" ? "All transactions" : `All ${type}s`}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {filteredTransactions.length ? (
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
            {filteredTransactions.map((transaction) => {
              const isEditing = editingId === transaction.id;
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
                <tr className={styles.transactionsTr} key={transaction.id}>
                  <TableData className={styles.transactionsTd}>
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
                  </TableData>
                  <TableData
                    className={styles.transactionsTd}
                    isEditing={isEditing}
                    value={
                      transaction.type === "transfer"
                        ? transaction.from
                        : transaction.account.charAt(0).toUpperCase() +
                          transaction.account.slice(1)
                    }
                  >
                    <p className={styles.account}>
                      {transaction.type === "transfer"
                        ? transaction.from
                        : transaction.account.charAt(0).toUpperCase() +
                          transaction.account.slice(1)}
                    </p>
                  </TableData>
                  <TableData
                    className={styles.transactionsTd}
                    isEditing={isEditing}
                    value={transaction.date}
                  >
                    <p className={styles.date}>{transaction.date}</p>
                  </TableData>
                  <TableData
                    className={styles.transactionsTd}
                    isEditing={isEditing}
                    value={transaction.amount}
                  >
                    <p style={isIncome ? { color: "#17B26A" } : {}}>
                      {updAmount}
                    </p>
                  </TableData>
                  {!isShortTable && (
                    <TableData
                      className={styles.transactionsTd}
                      isEditing={isEditing}
                      value={transaction.description}
                    >
                      <p className={styles.date}>{transaction.description}</p>
                    </TableData>
                  )}
                  <TableData
                    className={`${styles.transactionsTd} ${styles.iconsTd}`}
                  >
                    {isEditing ? (
                      <div className={styles.editingIcons}>
                        <div
                          onClick={handleCloseEditing}
                          className={styles.save}
                        >
                          <img src="/assets/icons/save.svg" alt="Save icon" />
                        </div>
                        <div
                          onClick={handleCloseEditing}
                          className={styles.cancel}
                        >
                          <img
                            src="/assets/icons/cancel.svg"
                            alt="Cancel icon"
                          />
                        </div>
                      </div>
                    ) : (
                      <div className={styles.iconsCtn}>
                        <div
                          onClick={() => handleEdit(transaction.id)}
                          className={styles.deleteTransaction}
                        >
                          <img
                            src="/assets/icons/edit.svg"
                            alt="Icon"
                            className={styles.edit}
                          />
                        </div>
                        <div
                          onClick={() => onDeleteTransaction(transaction.id)}
                          className={styles.deleteTransaction}
                        >
                          <img
                            src="/assets/icons/delete.svg"
                            alt="Icon"
                            className={styles.delete}
                          />
                        </div>
                      </div>
                    )}
                  </TableData>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <div className={styles.emptyTable}>
          <p className={styles.emptyTableText}>No {activeType}s registered</p>
        </div>
      )}
    </div>
  );
}

const TableData = (props) => {
  const { children, className, isEditing = false, value } = props;

  return (
    <td className={className}>
      {isEditing ? <input value={value} /> : children}
    </td>
  );
};

export default TransactionsTable;
