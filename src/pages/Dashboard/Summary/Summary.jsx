import "./Summary.css";

function Summary({ value, type }) {
  return (
    <div className={`summary ${type}`}>
      <p>{value}</p>
    </div>
  );
}

export default Summary;
