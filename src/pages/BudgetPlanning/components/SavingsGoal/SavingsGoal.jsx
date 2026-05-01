import { useCurrentUser } from "../../../../hooks/useCurrentUser";
import { formatCurrency } from "../../../../utils/currency";
import "./SavingsGoal.css";

const SavingsGoal = ({ goal, monthlyBudget, totalSpent, onEditGoal }) => {
  const currentUser = useCurrentUser();
  const currency = currentUser?.currency || "USD";

  const target = Number(goal.target) || 0;
  const availableAfterSpending = Math.max(monthlyBudget - totalSpent, 0);

  const targetStatus =
    availableAfterSpending >= target ? "On Track" : "Needs Attention";

  const suggestedWeeklySave = Math.ceil(target / 4);

  return (
    <div className="savings-goal-card">
      <div className="savings-goal-header-row">
        <div className="savings-goal-header">
          <p className="savings-goal-label">Savings Goal</p>
          <h3>{goal.title}</h3>
        </div>

        <button
          type="button"
          className="edit-goal-btn"
          onClick={onEditGoal}
        >
          Edit Goal
        </button>
      </div>

      <div className="savings-goal-progress-main">
        <div>
          <strong>{formatCurrency(target, currency)}</strong>
          <p>monthly savings target</p>
        </div>

        <span>{targetStatus}</span>
      </div>

      <div className="savings-goal-stats">
        <div className="savings-stat-box">
          <p>Available After Spending</p>
          <h4>{formatCurrency(availableAfterSpending, currency)}</h4>
        </div>

        <div className="savings-stat-box">
          <p>Target Status</p>
          <h4>{targetStatus}</h4>
        </div>

        <div className="savings-stat-box full">
          <p>Suggested Weekly Save</p>
          <h4>{formatCurrency(suggestedWeeklySave, currency)}</h4>
        </div>
      </div>
    </div>
  );
};

export default SavingsGoal;