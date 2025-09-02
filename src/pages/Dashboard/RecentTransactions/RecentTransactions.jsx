import transactions from "../../../data/mock_transactions.json";
import "./RecentTransactions.css";

function RecentTransactions() {
  const sortedTransactions = transactions
    .slice()
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  const transactionsToShow = sortedTransactions.slice(0, 7);

  return (
    <div className="RecentTransactions">
      <div className="RecentTransactions-Header">
        <h3>Recent Transactions</h3>
        <button className="add-btn">+</button>
      </div>
      <table className="RecentTransactions-Table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Category</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {transactionsToShow.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.date}</td>
              <td>{transaction.category}</td>
              <td className="amount">{transaction.amount.toFixed(2)}$</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RecentTransactions;