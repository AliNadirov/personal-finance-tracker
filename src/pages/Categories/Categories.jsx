import { useState, useEffect } from "react";
import mockTransactions from "../../data/mock_transactions.json";
import { getTransactions, saveTransactions } from "../../services/storage";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import "./Categories.css";

const categoryTypes = {
  Family: ["Kids Clothes", "School Supplies", "Toys", "Pet", "Family Care"],
  Essentials: ["Groceries", "Utilities", "Internet", "Food", "Rent"],
  Lifestyle: ["Dining Out", "Shopping", "Entertainment", "Car", "Gym"],
  Education: ["Books", "Course", "Workshop", "Tuition"],
  Travel: ["Taxi", "Bus", "Flight", "Hotel", "Transport"],
  Health: ["Medical", "Dental", "Pharmacy", "Supplements", "Gym"],
  Other: ["General", "Unexpected", "Uncategorized", "Miscellaneous"],
};

const initialCategories = [
  "Family",
  "Essentials",
  "Lifestyle",
  "Education",
  "Travel",
  "Health",
  "Other",
];

const getTodayDate = () => new Date().toISOString().split("T")[0];

const Categories = () => {
  const navigate = useNavigate();

  const [categories] = useState(initialCategories);
  const [selectedCategory, setSelectedCategory] = useState(initialCategories[0]);
  const [transactions, setTransactions] = useState([]);
  const [newTransactionType, setNewTransactionType] = useState(
    categoryTypes[initialCategories[0]][0]
  );
  const [newTransactionAmount, setNewTransactionAmount] = useState("");
  const [newTransactionDescription, setNewTransactionDescription] = useState("");
  const [newTransactionDate, setNewTransactionDate] = useState(getTodayDate());

  useEffect(() => {
    const stored = getTransactions();
    setTransactions([...mockTransactions, ...stored]);
  }, []);

  useEffect(() => {
    setNewTransactionType(categoryTypes[selectedCategory][0]);
    setNewTransactionDate(getTodayDate());
  }, [selectedCategory]);

  const filteredTransactions = transactions
    .filter((transaction) => transaction.category === selectedCategory)
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  const handleBack = () => {
    navigate("/dashboard");
  };

  const handleAddTransaction = () => {
    if (!newTransactionAmount) {
      alert("Please enter amount");
      return;
    }

    const amount = Number(newTransactionAmount);

    if (Number.isNaN(amount) || amount <= 0) {
      alert("Amount must be greater than 0");
      return;
    }

    const storedTransactions = getTransactions();

    const newTransaction = {
      id: `manual-${Date.now()}`,
      date: newTransactionDate,
      category: selectedCategory,
      type: newTransactionType,
      amount,
      description:
        newTransactionDescription.trim() ||
        `${newTransactionType} added to ${selectedCategory}`,
      source: "manual",
      createdAt: Date.now(),
    };

    const updatedStoredTransactions = [...storedTransactions, newTransaction];

    saveTransactions(updatedStoredTransactions);
    setTransactions([...mockTransactions, ...updatedStoredTransactions]);

    setNewTransactionType(categoryTypes[selectedCategory][0]);
    setNewTransactionAmount("");
    setNewTransactionDescription("");
    setNewTransactionDate(getTodayDate());
  };

  return (
    <div className="categories-page">
      <div className="categories-shell">
        <div className="categories-header">
          <p className="categories-label">Spending Control</p>
          <h2 className="page-title">Categories</h2>
          <p className="categories-subtitle">
            Add spending by category and keep every transaction organized.
          </p>
        </div>

        <div className="categories-list">
          {categories.map((category) => (
            <button
              key={category}
              className={`category-btn ${
                selectedCategory === category ? "active" : ""
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <section className="transactions-section">
          <div className="transactions-top-bar">
            <div className="transactions-header">
              <div>
                <span className="section-kicker">Quick Add</span>
                <h3>{selectedCategory} Transactions</h3>
                <p>
                  The selected category is applied automatically. Change the date
                  only when recording older spending.
                </p>
              </div>
            </div>

            <button
              type="button"
              className="back-button-categories"
              onClick={handleBack}
            >
              <ArrowLeft size={20} />
              <span>Back</span>
            </button>
          </div>

          <div className="quick-add-card">
            <div className="add-transaction-form">
              <label>
                <span>Type</span>
                <select
                  value={newTransactionType}
                  onChange={(event) =>
                    setNewTransactionType(event.target.value)
                  }
                >
                  {categoryTypes[selectedCategory].map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                <span>Amount</span>
                <input
                  type="text"
                  inputMode="decimal"
                  value={newTransactionAmount}
                  placeholder="$0.00"
                  onChange={(event) => {
                    const value = event.target.value;

                    if (/^\d*\.?\d{0,2}$/.test(value)) {
                      setNewTransactionAmount(value);
                    }
                  }}
                />
              </label>

              <label>
                <span>Date</span>
                <input
                  type="date"
                  max={getTodayDate()}
                  value={newTransactionDate}
                  onChange={(event) =>
                    setNewTransactionDate(event.target.value)
                  }
                />
              </label>

              <label className="description-field">
                <span>Description</span>
                <input
                  type="text"
                  value={newTransactionDescription}
                  placeholder="Optional note"
                  onChange={(event) =>
                    setNewTransactionDescription(event.target.value)
                  }
                />
              </label>

              <button
                type="button"
                className="add-category-btn"
                onClick={handleAddTransaction}
              >
                Add
              </button>
            </div>
          </div>

          <div className="table-header-row">
            <div>
              <h4>Transaction History</h4>
              <p>
                {filteredTransactions.length} records in {selectedCategory}
              </p>
            </div>
          </div>

          <div className="transactions-table-wrapper">
            <table className="transactions-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Type</th>
                  <th>Amount</th>
                  <th>Description</th>
                  <th>Source</th>
                </tr>
              </thead>

              <tbody>
                {filteredTransactions.length > 0 ? (
                  filteredTransactions.map((transaction) => (
                    <tr key={transaction.id}>
                      <td>{transaction.date}</td>
                      <td>{transaction.type}</td>
                      <td>${Number(transaction.amount).toFixed(2)}</td>
                      <td>{transaction.description}</td>
                      <td>
                        <span
                          className={`source-badge ${
                            transaction.source === "manual"
                              ? "manual"
                              : "bank"
                          }`}
                        >
                          {transaction.source === "manual"
                            ? "Manual"
                            : "Bank"}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="empty-row">
                      No transactions yet for {selectedCategory}.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Categories;