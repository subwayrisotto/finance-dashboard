import React, { useEffect, useState } from "react";
import styles from "./OverviewPage.module.scss";
import user from "../../data/user";
import dataBy from "../../data/dataBy";
import CashContainer from "../../components/CashContainerComponent/CashContainerComponent";
import CashOperationContainer from "../../components/CashOperationContainerComponent/CashOperationContainerComponent";
import Modal from "../../components/ModalComponent/ModalComponent";
import ExpensesChart from "../../components/ExpensesChartComponent/ExpensesChartComponent";
import fakeTransactions from "../../data/transactions";
import TransactionsTable from "../../components/TransactionsTableComponent/TransactionsTableComponent";

function Overview() {
  const [activeId, setActiveId] = useState(
    dataBy.find((item) => item.isActive)?.id || 1,
  );
  const [transactions, setTransactions] = useState(fakeTransactions);
  const [selectedBox, setSelectedBox] = useState(null);

  const incomeTransactions = transactions.filter((t) => t.type === "income");
  const expensesTransactions = transactions.filter((t) => t.type === "expense");

  const totalIncome = incomeTransactions.reduce((sum, t) => sum + t.amount, 0);
  const totalExpenses = expensesTransactions.reduce(
    (sum, t) => sum + t.amount,
    0,
  );

  const balance = totalIncome - totalExpenses;

  const sortedTransactions = [...transactions]
    .filter((transaction) => transaction.type !== "transfer")
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  const handleOpenModal = (type) => {
    setSelectedBox(type);
  };

  const handleAddTransaction = (transaction) => {
    setTransactions((prev) => [...prev, transaction]);
  };

  useEffect(() => {
    console.log(transactions);
  }, [transactions]);

  return (
    <div className="pageContent">
      <div className="wrapper">
        <div className={styles.topContent}>
          <p className={styles.greetingMsg}>Hello, {user.name}!</p>

          <div className={styles.leftContent}>
            <ul className={styles.dataByList}>
              {dataBy.map((item) => {
                return (
                  <li
                    key={item.id}
                    className={`${styles.dataByListItem} ${
                      activeId === item.id ? styles.active : ""
                    }`}
                    onClick={() => setActiveId(item.id)}
                  >
                    {item.text}
                  </li>
                );
              })}
            </ul>

            <div className={styles.selectByPeriod}>
              <img src="/assets/icons/calendar.svg" alt="Calendar" />
              <p>Select period</p>
            </div>
          </div>
        </div>

        <div className={styles.containers}>
          <CashContainer
            title="Balance"
            color="#155eef"
            amount={balance}
            prevAmount={4000}
          />
          <CashContainer
            title="Incomes"
            amount={totalIncome}
            prevAmount={7000}
          />
          <CashContainer title="Expenses" amount={totalExpenses} />
        </div>

        <div className={styles.cashOperationsCtn}>
          <CashOperationContainer
            icon={"/assets/icons/income.svg"}
            iconBoxColor="#DCFAE6"
            title={"Add income"}
            description={"Create an income manually"}
            onClick={() => handleOpenModal("income")}
          />
          <CashOperationContainer
            icon={"/assets/icons/expense.svg"}
            iconBoxColor="#FEE4E2"
            title={"Add expense"}
            description={"Create an expense manually"}
            onClick={() => handleOpenModal("expense")}
          />
          <CashOperationContainer
            icon={"/assets/icons/transfer.svg"}
            iconBoxColor="#F9FAFB"
            title={"Transfer money"}
            description={"Select the amount and make a transfer"}
            onClick={() => handleOpenModal("transfer")}
          />
        </div>

        {selectedBox && (
          <Modal
            onClose={() => setSelectedBox(null)}
            selectedBox={selectedBox}
            onAddTransaction={handleAddTransaction}
          />
        )}

        <div className={styles.detailedTransactionInfo}>
          {" "}
          <div className={styles.expensesChartCtn}>
            <ExpensesChart transactions={expensesTransactions} />
          </div>
          <div className={styles.transactionTable}>
            <TransactionsTable transactions={sortedTransactions} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Overview;
