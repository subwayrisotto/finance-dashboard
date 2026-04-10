import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./layout/Layout";
import Overview from "./pages/OverviewPage";
import Transactions from "./pages/TransactionsPage";
import EmptyPage from "./pages/EmptyPage";
import "./App.css";
import fakeTransactions from "./data/transactions";
import { useState } from "react";

function App() {
  const [transactions, setTransactions] = useState(fakeTransactions);

  const handleSortTransactionsByDate = (arr) => {
    const sortedArr = [...arr]
      .filter((transaction) => transaction.type !== "transfer")
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  };

  const handleAddTransaction = (transaction) => {
    setTransactions((prev) => [...prev, transaction]);
  };

  const handleDeleteTransaction = (id) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="overview" />} />
          <Route
            path="overview"
            element={
              <Overview
                transactions={transactions}
                onAddTransaction={handleAddTransaction}
                onDeleteTransaction={handleDeleteTransaction}
              />
            }
          />
          <Route
            path="transactions"
            element={
              <Transactions
                transactions={transactions}
                onDeleteTransaction={handleDeleteTransaction}
              />
            }
          />
          <Route path="analytics" element={<EmptyPage title="Analytics" />} />
          <Route path="accounts" element={<EmptyPage title="Accounts" />} />
          <Route path="wallet" element={<EmptyPage title="Wallet" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
