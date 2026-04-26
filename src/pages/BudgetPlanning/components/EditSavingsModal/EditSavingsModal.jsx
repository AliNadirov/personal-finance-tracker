import { useState } from "react";
import "./EditSavingsModal.css";

function EditSavingsModal({
  goal,
  recommendedGoal,
  onClose,
  onSave,
}) {
  const [title, setTitle] = useState(goal?.title || "Monthly Savings");
  const [target, setTarget] = useState(
    String(goal?.target || recommendedGoal?.target || "")
  );
  const [error, setError] = useState("");

  const handleMoneyChange = (value) => {
    if (/^\d*\.?\d{0,2}$/.test(value)) {
      setTarget(value);
      setError("");
    }
  };

  const handleResetRecommended = () => {
    setTitle(recommendedGoal?.title || "Monthly Savings");
    setTarget(String(recommendedGoal?.target || ""));
    setError("");
  };

  const handleSave = () => {
    const cleanTitle = title.trim();
    const numericTarget = Number(target);

    if (!cleanTitle) {
      setError("Goal name is required.");
      return;
    }

    if (!target || numericTarget <= 0) {
      setError("Target amount must be greater than 0.");
      return;
    }

    onSave({
      title: cleanTitle,
      target: numericTarget,
    });
  };

  return (
    <div className="savings-modal-overlay">
      <div className="savings-modal">
        <div className="savings-modal-header">
          <div>
            <p className="modal-label">Edit Goal</p>
            <h3>Monthly Savings Target</h3>
          </div>

          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close modal"
          >
            ×
          </button>
        </div>

        <div className="savings-modal-fields">
          <label>
            <span>Goal Name</span>
            <input
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                setError("");
              }}
              placeholder="Enter savings goal name"
            />
          </label>

          <label>
            <span>Target Amount</span>
            <input
              type="text"
              inputMode="decimal"
              value={target}
              onChange={(e) => handleMoneyChange(e.target.value)}
              placeholder="Enter target amount"
            />
          </label>
        </div>

        {error && (
          <p className="modal-error-text">
            {error}
          </p>
        )}

        <div className="savings-modal-actions">
          <button
            type="button"
            className="modal-secondary-btn"
            onClick={handleResetRecommended}
          >
            Reset Recommended
          </button>

          <button
            type="button"
            className="modal-cancel-btn"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            type="button"
            className="modal-save-btn"
            onClick={handleSave}
          >
            Save Goal
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditSavingsModal;