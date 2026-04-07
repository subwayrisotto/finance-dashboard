import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./layout/Layout";
import Overview from "./pages/OverviewPage";
import Transactions from "./pages/TransactionsPage";
import EmptyPage from "./pages/EmptyPage";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="overview" />} />
          <Route path="overview" element={<Overview />} />
          <Route
            path="transactions"
            element={<EmptyPage title="Transactions" />}
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
