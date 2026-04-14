import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./layout/Layout";
import Overview from "./pages/OverviewPage";
import Transactions from "./pages/TransactionsPage";
import EmptyPage from "./pages/EmptyPage";
import "./App.css";
import { useEffect, useState } from "react";
import { deleteTransaction, getAllTransactions } from "./api";

function App() {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setIsLoading(true);

        const data = await getAllTransactions();

        setTransactions(data);
        setIsLoading(false);
      } catch (e) {
        console.log(e);
      }
    };

    fetchTransactions();
  }, []);

  // const handleSortTransactionsByDate = (arr) => {
  //   const sortedArr = [...arr]
  //     .filter((transaction) => transaction.type !== "transfer")
  //     .sort((a, b) => new Date(b.date) - new Date(a.date));
  // };

  const handleAddTransaction = (transaction) => {
    setTransactions((prev) => [...prev, transaction]);
  };

  const handleDeleteTransaction = async (id) => {
    const updTransactions = await deleteTransaction(id);
    setTransactions(updTransactions);
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
                isLoading={isLoading}
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
