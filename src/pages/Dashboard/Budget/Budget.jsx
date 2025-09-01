import "./Budget.css"

function Budget() {
  const data = [
    { category: "Auto", spent: 100 },
    { category: "Food", spent: 200 },
    { category: "Leisure", spent: 170 },
    { category: "Household", spent: 100 },
  ];

  return (
    <div className="budget-container">
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
          {data.map((item, i) => (
            <tr key={i}>
              <td>{item.category}</td>
              <td>
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${(item.spent / 300) * 100}%` }}
                  ></div>
                </div>
              </td>
              <td>${item.spent.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Budget;
