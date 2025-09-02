import { useState, useEffect } from "react";
import { getTransactions, getCurrentUser } from "../../../services/storage";
import mockTransactions from "../../../data/mock_transactions.json";
import "./Budget.css";

function Budget() {
  const [allTransactions, setAllTransactions] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const storedUser = getCurrentUser();
    setCurrentUser(storedUser);

    const storedTransactions = getTransactions();
    setAllTransactions([...mockTransactions, ...storedTransactions]);
  }, []);

  if (!currentUser) return <p>Loading user data...</p>;

  const totalBudgetAmount = Number(currentUser.budget) || 0;
  const firstFourCategories = [...new Set(allTransactions.map(transaction => transaction.category))];
  const categoriesOverview = firstFourCategories.map(categoryName => {
    const totalSpentInCategory = allTransactions
      .filter(transaction => transaction.category === categoryName)
      .reduce((totalAmountSoFar, transaction) => totalAmountSoFar + transaction.amount, 0);

    return {
      categoryName,
      totalSpent: totalSpentInCategory
    };
  });

  return (
    <div className="budget-container budget">
      <h3>Budget Overview</h3>
      <table className="budget-table">
        <thead>
          <tr>
            <th>Category</th>
            <th>Budget</th>
            <th>Spent</th>
          </tr>
        </thead>
        <tbody>
          {categoriesOverview.map((categoryData, index) => {
            const spentPercentage = totalBudgetAmount > 0
              ? Math.min((categoryData.totalSpent / totalBudgetAmount) * 100, 100)
              : 0;

            return (
              <tr key={index}>
                <td>{categoryData.categoryName}</td>
                <td>
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{ width: `${spentPercentage}%` }}
                    ></div>
                  </div>
                </td>
                <td>${categoryData.totalSpent.toFixed(2)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Budget;