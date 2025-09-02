import { useState, useEffect } from "react";
import mockTransactions from "../../data/mock_transactions.json";
import { getTransactions, saveTransactions } from "../../services/storage";
import { useNavigate } from 'react-router-dom';
import backIcon from '../../assets/icons/baseline-arrow-back.png';
import "./Categories.css";

const initialCategories = [
  "Family & Kids",
  "Essentials",
  "Lifestyle",
  "Education",
  "Travels",
  "Health",
];

const Categories = () => {
  const [categories] = useState(initialCategories);
  const [selectedCategory, setSelectedCategory] = useState(initialCategories[0]);
  const [transactions, setTransactions] = useState([]);
  const [newTransactionType, setNewTransactionType] = useState("");
  const [newTransactionAmount, setNewTransactionAmount] = useState("");
  const [newTransactionDescription, setNewTransactionDescription] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const stored = getTransactions();
    if (stored.length > 0) {
      setTransactions(stored);
    } else {
      setTransactions(mockTransactions);
      saveTransactions(mockTransactions);
    }
  }, []);
  const handleBack = () => {
    navigate("/dashboard");
  };
  const filteredTransactions = selectedCategory
    ? transactions.filter((transaction) => transaction.category === selectedCategory)
    : [];

  const handleAddTransaction = () => {
    if (!newTransactionType || !newTransactionAmount) return;

    const newTransaction = {
      id: transactions.length + 1,
      date: new Date().toISOString().split("T")[0],
      category: selectedCategory,
      type: newTransactionType,
      amount: parseFloat(newTransactionAmount),
      description: newTransactionDescription || `Added in ${selectedCategory}`,
    };

    const updated = [...transactions, newTransaction];
    setTransactions(updated);
    saveTransactions(updated);

    setNewTransactionType("");
    setNewTransactionAmount("");
    setNewTransactionDescription("");
  };



  return (
    <div className="categories-page">
      <h2 className="page-title">Categories</h2>
      <div className="categories-list">
        {categories.map((category) => (
          <button
            key={category}
            className={`category-btn ${selectedCategory === category ? "active" : ""}`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
        <button className="back-button-categories" onClick={handleBack}>
          <img src={backIcon} alt="Back" />
        </button>
      </div>

      {selectedCategory && (
        <div className="transactions-section">
          <div className="transactions-header">
            <h3>{selectedCategory} Transactions</h3>
            <button className="add-category-btn" onClick={handleAddTransaction}>
              + Add
            </button>
          </div>

          <div className="add-transaction-form">
            <input
              type="text"
              value={newTransactionType}
              placeholder="Type (e.g. Food, Pet)"
              onChange={(event) => setNewTransactionType(event.target.value)}
            />
            <input
              type="number"
              value={newTransactionAmount}
              placeholder="Amount"
              onChange={(event) => setNewTransactionAmount(event.target.value)}
            />
            <input
              type="text"
              value={newTransactionDescription}
              placeholder="Description (optional)"
              onChange={(event) => setNewTransactionDescription(event.target.value)}
            />
          </div>

          <table className="transactions-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Type</th>
                <th>Amount</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map((transaction) => (
                  <tr key={transaction.id}>
                    <td>{transaction.date}</td>
                    <td>{transaction.type}</td>
                    <td>${transaction.amount.toFixed(2)}</td>
                    <td>{transaction.description}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" style={{ textAlign: "center", color: "#777" }}>
                    No transactions yet for {selectedCategory}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Categories;