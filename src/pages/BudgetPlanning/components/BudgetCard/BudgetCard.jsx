import "./BudgetCard.css";

const BudgetCard = ({ title, value, type, featured = false }) => {
  return (
    <div
      className={`planning-budget-card ${type} ${
        featured ? "featured-card" : ""
      }`}
    >
      <p>{title}</p>
      <h2>{value}</h2>
    </div>
  );
};

export default BudgetCard;