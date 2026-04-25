import { useState } from "react";
import "./EditSavingsModal.css";

const EditSavingsModal = ({ goal, recommendedGoal, onClose, onSave }) => {
  const [title, setTitle] = useState(goal.title);
  const [target, setTarget] = useState(String(goal.target));
  const [error, setError] = useState("");

  const handleMoneyChange = (value) => {
    if (/^\d*\.?\d{0,2}$/.test(value)) {
      setTarget(value);
      setError("");
    }
  };

  const handleResetRecommended = () => {
    setTitle(recommendedGoal.title);
    setTarget(String(recommendedGoal.target));
    setError("");
  };

  const handleSave = () => {
    if (!target || Number(target) <= 0) {
      setError("Target amount must be greater than 0.");
      return;
    }

    onSave({
      title: title.trim() || recommendedGoal.title,
      target: Number(target),
    });
  };

  return (
    <div className="savings-modal-overlay">
      <div className="savings-modal">
        <div className="savings-modal-header">
          <div>
            <p>Edit Goal</p>
            <h3>Monthly Savings Target</h3>
          </div>

          <button type="button" className="modal-close-btn" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="savings-modal-fields">
          <label>
            <span>Goal Name</span>
            <input
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </label>

          <label>
            <span>Target Amount</span>
            <input
              type="text"
              inputMode="decimal"
              value={target}
              onChange={(event) => handleMoneyChange(event.target.value)}
            />
          </label>

          {error && <p className="modal-error-text">{error}</p>}
        </div>

        <div className="savings-modal-actions">
          <button
            type="button"
            className="modal-cancel-btn"
            onClick={handleResetRecommended}
          >
            Reset Recommended
          </button>

          <button type="button" className="modal-cancel-btn" onClick={onClose}>
            Cancel
          </button>

          <button type="button" className="modal-save-btn" onClick={handleSave}>
            Save Goal
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditSavingsModal;