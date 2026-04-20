import { useState, useEffect } from "react";
import { getTransactions } from "../../../services/storage";
import mockTransactions from "../../../data/mock_transactions.json";
import "./Budget.css";

function Budget({ budget = 0 }) {
  const [latestMonthTransactions, setLatestMonthTransactions] = useState([]);

  useEffect(() => {
    const storedTransactions = getTransactions();
    const allTransactions = [...mockTransactions, ...storedTransactions];

    if (allTransactions.length === 0) {
      setLatestMonthTransactions([]);
      return;
    }

    const latestTimestamp = Math.max(
      ...allTransactions.map((transaction) => new Date(transaction.date).getTime())
    );

    const latestDate = new Date(latestTimestamp);
    const latestMonth = latestDate.getMonth();
    const latestYear = latestDate.getFullYear();

    const filteredTransactions = allTransactions.filter((transaction) => {
      const transactionDate = new Date(transaction.date);

      return (
        transactionDate.getMonth() === latestMonth &&
        transactionDate.getFullYear() === latestYear
      );
    });

    setLatestMonthTransactions(filteredTransactions);
  }, []);

  const categories = [
    ...new Set(latestMonthTransactions.map((transaction) => transaction.category)),
  ];

  const categoryCount = categories.length || 1;
  const categoryBudget = budget / categoryCount;

  const totalSpent = latestMonthTransactions.reduce(
    (sum, transaction) => sum + Number(transaction.amount),
    0
  );

  const remainingBudget = Math.max(budget - totalSpent, 0);

  const categoriesOverview = categories.map((categoryName) => {
    const categorySpent = latestMonthTransactions
      .filter((transaction) => transaction.category === categoryName)
      .reduce((sum, transaction) => sum + Number(transaction.amount), 0);

    const spentPercentage =
      categoryBudget > 0 ? Math.min((categorySpent / categoryBudget) * 100, 100) : 0;

    let statusClass = "safe";

    if (spentPercentage >= 100) {
      statusClass = "danger";
    } else if (spentPercentage >= 70) {
      statusClass = "warning";
    }

    return {
      categoryName,
      categorySpent,
      spentPercentage,
      statusClass,
    };
  });

  return (
    <div className="budget-container budget">
      <h3>Budget Overview</h3>

      <div className="budget-summary">
        <div className="budget-summary-item">
          <span className="budget-summary-label">Budget</span>
          <strong>${budget.toFixed(2)}</strong>
        </div>

        <div className="budget-summary-item">
          <span className="budget-summary-label">Spent</span>
          <strong>${totalSpent.toFixed(2)}</strong>
        </div>

        <div className="budget-summary-item">
          <span className="budget-summary-label">Left</span>
          <strong>${remainingBudget.toFixed(2)}</strong>
        </div>
      </div>

      <div className="budget-list">
        {categoriesOverview.map((categoryData) => (
          <div className="budget-item" key={categoryData.categoryName}>
            <div className="budget-item-top">
              <span className="budget-category">{categoryData.categoryName}</span>
              <span className="budget-spent">
                ${categoryData.categorySpent.toFixed(2)}
              </span>
            </div>

            <div className="progress-bar">
              <div
                className={`progress-fill ${categoryData.statusClass}`}
                style={{ width: `${categoryData.spentPercentage}%` }}
              ></div>
            </div>

            <div className="budget-item-bottom">
              <span className="budget-percent">
                {Math.round(categoryData.spentPercentage)}% used
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Budget;