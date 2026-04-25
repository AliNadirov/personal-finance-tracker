import "./BudgetProgress.css";

const BudgetProgress = ({ categories, onEditLimits }) => {
  const totalLimit = categories.reduce((sum, item) => sum + item.limit, 0);
  const totalSpent = categories.reduce((sum, item) => sum + item.spent, 0);
  const remainingLimit = totalLimit - totalSpent;

  return (
    <div className="budget-progress-card">
      <div className="budget-progress-header">
        <div>
          <p className="budget-progress-label">Spending Limits</p>
          <h3>Category Budget Progress</h3>
          <span>Track monthly spending against your planned limits</span>
        </div>

        <button
          type="button"
          className="edit-limits-btn"
          onClick={onEditLimits}
        >
          Edit Limits
        </button>
      </div>

      <div className="budget-progress-list">
        {categories.map((item) => (
          <div key={item.category} className="progress-item">
            <div className="progress-top">
              <div>
                <h4>{item.category}</h4>
                <p>
                  ${item.spent.toFixed(2)} / ${item.limit.toFixed(2)}
                </p>
              </div>

              <span className="progress-percent">
                {Math.round(item.percentage)}%
              </span>
            </div>

            <div className="progress-bar">
              <div
                className={`progress-fill ${
                  item.percentage >= 90 ? "danger" : ""
                }`}
                style={{ width: `${item.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="budget-progress-footer">
        <div>
          <span>Total planned</span>
          <strong>${totalLimit.toFixed(2)}</strong>
        </div>

        <div>
          <span>Remaining limit</span>
          <strong>${remainingLimit.toFixed(2)}</strong>
        </div>
      </div>
    </div>
  );
};

export default BudgetProgress;