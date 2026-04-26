import { useEffect, useState } from "react";
import {
  getAllTransactions,
  getBudgetPlan,
  saveBudgetPlan,
} from "../../../services/storage";
import "./Budget.css";

const categoryWeights = {
  Essentials: 0.28,
  Lifestyle: 0.14,
  Health: 0.08,
  Education: 0.1,
  Travel: 0.1,
  Family: 0.08,
  Other: 0.02,
};

const createDefaultBudgetPlan = (monthlyBudget) => ({
  baseMonthlyBudget: monthlyBudget,
  categoryLimits: Object.fromEntries(
    Object.entries(categoryWeights).map(([category, weight]) => [
      category,
      Math.round(monthlyBudget * weight),
    ])
  ),
});

function Budget({ budget = 0 }) {
  const [latestMonthTransactions, setLatestMonthTransactions] = useState([]);
  const [categoryLimits, setCategoryLimits] = useState({});

  useEffect(() => {
    const storedPlan = getBudgetPlan();

    if (!storedPlan || storedPlan.baseMonthlyBudget !== budget) {
      const newPlan = createDefaultBudgetPlan(budget);
      saveBudgetPlan(newPlan);
      setCategoryLimits(newPlan.categoryLimits);
    } else {
      setCategoryLimits(storedPlan.categoryLimits || {});
    }

    const allTransactions = getAllTransactions();

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
  }, [budget]);

  const totalSpent = latestMonthTransactions.reduce(
    (sum, transaction) => sum + Number(transaction.amount),
    0
  );

  const remainingBudget = Math.max(budget - totalSpent, 0);

  const categoriesOverview = Object.keys(categoryLimits).map((categoryName) => {
    const categorySpent = latestMonthTransactions
      .filter((transaction) => transaction.category === categoryName)
      .reduce((sum, transaction) => sum + Number(transaction.amount), 0);

    const categoryBudget = Number(categoryLimits[categoryName]) || 1;

    const spentPercentage = Math.min(
      (categorySpent / categoryBudget) * 100,
      100
    );

    let statusClass = "safe";

    if (spentPercentage >= 90) {
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
          <span className="budget-summary-label">Remaining</span>
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