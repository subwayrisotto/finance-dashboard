export const getAllTransactions = async () => {
  try {
    const response = await fetch("http://localhost:5050/api/transactions");
    const data = await response.json();

    return data.data;
  } catch (e) {
    console.log(e);
  }
};

export const postNewTransaction = async (newTransaction) => {
  try {
    const response = await fetch("http://localhost:5050/api/transactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTransaction),
    });

    const data = await response.json();

    return data.data;
  } catch (e) {
    console.error("Failed to post transaction:", e);
    return null;
  }
};

export const deleteTransaction = async (id) => {
  try {
    const response = await fetch(
      `http://localhost:5050/api/transactions/${id}`,
      {
        method: "DELETE",
      },
    );

    const data = await response.json();
    return data.data;
  } catch (e) {
    console.error("Failed to delete transaction:", e);
    return null;
  }
};
