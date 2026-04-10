import React from "react";
import TransactionsTable from "../../components/TransactionsTableComponent/TransactionsTableComponent";

function Transactions(props) {
  const { transactions, onDeleteTransaction } = props;
  return (
    <div className="pageContent">
      {" "}
      <TransactionsTable
        transactions={transactions}
        onDeleteTransaction={onDeleteTransaction}
        isShortTable={false}
      />
    </div>
  );
}

export default Transactions;
