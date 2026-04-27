import { useState } from "react";
import "./EditBudgetModal.css";

const EditBudgetModal = ({
  limits,
  recommendedLimits,
  onClose,
  onSave,
}) => {
  const [formLimits, setFormLimits] = useState(limits);

  const handleChange = (category, value) => {
    if (/^\d*\.?\d{0,2}$/.test(value)) {
      setFormLimits((prev) => ({
        ...prev,
        [category]: value,
      }));
    }
  };

  const handleResetRecommended = () => {
    if (!recommendedLimits) return;

    setFormLimits(recommendedLimits);
  };

  const handleSave = () => {
    const cleanedLimits = Object.fromEntries(
      Object.entries(formLimits).map(([category, value]) => [
        category,
        Number(value) > 0 ? Number(value) : 1,
      ])
    );

    onSave(cleanedLimits);
  };

  return (
    <div className="budget-modal-overlay">
      <div className="budget-modal">
        <div className="budget-modal-header">
          <div>
            <p>Edit Limits</p>
            <h3>Category Budgets</h3>
          </div>

          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
          >
            x
          </button>
        </div>

        <div className="budget-modal-fields">
          {Object.entries(formLimits).map(([category, value]) => (
            <label key={category}>
              <span>{category}</span>
              <input
                type="text"
                inputMode="decimal"
                value={value}
                onChange={(event) =>
                  handleChange(category, event.target.value)
                }
              />
            </label>
          ))}
        </div>

        <div className="budget-modal-actions">
          <button
            type="button"
            className="modal-cancel-btn"
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
            Save Limits
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditBudgetModal;