import "./RecentTransactions.css"

function RecentTransactions(){
    const data = [
        {date: "30.07.2025", category: "Auto", amount: "50$"},
        {date: "30.07.2025", category: "Food", amount: "30$"},
        {date: "30.07.2025", category: "Pet", amount: "50$"},
        {date: "30.07.2025", category: "Leisure", amount: "45$"},
        {date: "30.07.2025", category: "Food", amount: "10$"},
        {date: "30.07.2025", category: "Shopping", amount: "150$"},
        {date: "30.07.2025", category: "Leisure", amount: "30$"},
    ];

    return (
    <div className="transactions">
      <div className="transactions-header">
        <h3>Recent Transactions</h3>
        <button className="add-btn">+</button>
      </div>
      <table className="transactions-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Category</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {data.map((tx, i) => (
            <tr key={i}>
              <td>{tx.date}</td>
              <td>{tx.category}</td>
              <td className="amount">{tx.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RecentTransactions;
