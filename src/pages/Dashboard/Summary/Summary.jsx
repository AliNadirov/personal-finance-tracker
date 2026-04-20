import "./Summary.css";

function Summary({ title, value, type }) {
  return (
    <div className={`summary ${type}`}>
      <span className="summary-title">{title}</span>
      <p className="summary-value">{value}</p>
    </div>
  );
}

export default Summary;