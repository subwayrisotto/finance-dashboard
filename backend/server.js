const express = require("express");
const cors = require("cors");
let fakeTransactions = require("./data/transactions");

const app = express();
const PORT = 5050;

app.use(cors());
app.use(express.json());

app.get("/api/transactions", (req, res) => {
  try {
    res.json({ data: fakeTransactions });
  } catch (e) {
    console.log(e);
  }
});

app.post("/api/transactions", (req, res) => {
  try {
    const newTransaction = {
      ...req.body,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };

    fakeTransactions.push(newTransaction);

    res.status(201).json({
      message: "Transaction added",
      data: newTransaction,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Server error" });
  }
});

app.delete("/api/transactions/:id", (req, res) => {
  try {
    const { id } = req.params;

    fakeTransactions = fakeTransactions.filter(
      (transaction) => transaction.id !== id,
    );

    res.status(201).json({
      message: `Transaction with ID: ${id} was deleted`,
      data: fakeTransactions,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server runs on ${PORT} port`);
});
