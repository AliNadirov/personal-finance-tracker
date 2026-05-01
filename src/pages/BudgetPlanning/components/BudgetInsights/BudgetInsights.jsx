import { useCurrentUser } from "../../../../hooks/useCurrentUser";
import { formatCurrency } from "../../../../utils/currency";
import "./BudgetInsights.css";

const BudgetInsights = ({ totalSpent, monthlyBudget, categories }) => {
  const currentUser = useCurrentUser();
  const currency = currentUser?.currency || "USD";

  const safeBudget = Number(monthlyBudget) || 0;
  const spentPercentage =
    safeBudget > 0 ? Math.min((totalSpent / safeBudget) * 100, 100) : 0;

  const highestCategory = [...categories].sort((a, b) => b.spent - a.spent)[0];
  const warningCategory = categories.find((item) => item.percentage >= 90);

  return (
    <div className="budget-insights-card">
      <div className="budget-insights-header">
        <p className="budget-insights-label">Insights</p>
        <h3>Budget Health</h3>
        <span>Simple signals to help you stay in control</span>
      </div>

      <div className="insights-list">
        <div className="insight-item">
          <strong>{Math.round(spentPercentage)}%</strong>
          <p>of your monthly budget has been used.</p>
        </div>

        {highestCategory && (
          <div className="insight-item">
            <strong>{highestCategory.category}</strong>
            <p>
              is your highest spending category (
              {formatCurrency(highestCategory.spent, currency)}).
            </p>
          </div>
        )}

        {warningCategory ? (
          <div className="insight-item warning">
            <strong>{warningCategory.category}</strong>
            <p>is close to or over its planned limit.</p>
          </div>
        ) : (
          <div className="insight-item success">
            <strong>Stable</strong>
            <p>Your category budgets are under control.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BudgetInsights;