import { useNavigate } from "react-router-dom";
import { getAllTransactions } from "../../../services/storage";
import { useCurrentUser } from "../../../hooks/useCurrentUser";
import { formatCurrency } from "../../../utils/currency";
import { isPastOrToday } from "../../../utils/dateFilters";
import "./RecentTransactions.css";

function RecentTransactions() {
  const navigate = useNavigate();
  const currentUser = useCurrentUser();
  const currency = currentUser?.currency || "USD";

  const transactionsToShow = getAllTransactions()
    .filter((transaction) => isPastOrToday(transaction.date))
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  const handleAddClick = () => {
    navigate("/categories");
  };

  const handleTransactionClick = (transaction) => {
    navigate("/categories", {
      state: {
        category: transaction.category,
      },
    });
  };

  return (
    <div className="RecentTransactions">
      <div className="RecentTransactions-Header">
        <h3>Recent Transactions</h3>

        <button className="add-btn" onClick={handleAddClick}>
          +
        </button>
      </div>

      <div className="RecentTransactions-List">
        {transactionsToShow.map((transaction, index) => {
          const isIncome = transaction.amount > 0;
          const transactionAmount = formatCurrency(
            Math.abs(transaction.amount),
            currency
          );

          return (
            <div
              key={`${transaction.id}-${transaction.date}-${index}`}
              className="transaction-item"
              onClick={() => handleTransactionClick(transaction)}
            >
              <div className="transaction-left">
                <div className="transaction-type">{transaction.type}</div>

                <div className="transaction-category">
                  {transaction.category} •{" "}
                  {new Date(`${transaction.date}T00:00:00`).toLocaleDateString()}
                </div>
              </div>

              <div
                className={`transaction-right ${
                  isIncome ? "transaction-income" : "transaction-expense"
                }`}
              >
                {isIncome ? "+" : "-"}
                {transactionAmount}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default RecentTransactions;