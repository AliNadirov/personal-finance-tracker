import React, { useState, useEffect } from "react";
import { getCurrentUser, setCurrentUser } from "../../../services/storage.js";
import mockAdditionalIncome from "../../../data/mockAdditionalIncome.json";
import backBtn from "../../../assets/icons/baseline-arrow-back.png";
import { useNavigate } from "react-router-dom";
import "./additionalIncome.css";


const workTypes = ["Freelance", "Part-time", "Gig/Task-based", "Remote/Online job", "Passive Income"];
const workModes = ["Offline", "Online", "Hybrid"];
const paymentFrequencies = ["Weekly", "Monthly", "Per Project"];

function AdditionalIncome() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    companyName: "",
    workType: "",
    workMode: "",
    monthlyIncome: "",
    paymentFrequency: "",
    startDate: "",
    endDate: "",
    description: "",
  });

  const [incomes, setIncomes] = useState([]);

  const handleBack = () => {
    navigate("/dashboard");
  };

  useEffect(() => {
    const storedUser = getCurrentUser();
    if (storedUser) {
      if (storedUser.additionalIncome && storedUser.additionalIncome.length > 0) {
        setIncomes(storedUser.additionalIncome);
      } else {
        setIncomes(mockAdditionalIncome);
        setCurrentUser({ ...storedUser, additionalIncome: mockAdditionalIncome });
      }
    }
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    const newIncome = {
      ...formData,
      id: Date.now(),
    };

    const updatedIncomes = [...incomes, newIncome];
    setIncomes(updatedIncomes);

    const user = getCurrentUser() || {};
    const updatedUser = {
      ...user,
      additionalIncome: updatedIncomes,
    };
    setCurrentUser(updatedUser);

    setFormData({
      companyName: "",
      workType: "",
      workMode: "",
      monthlyIncome: "",
      paymentFrequency: "",
      startDate: "",
      endDate: "",
      description: "",
    });
  }

  function handleDelete(id) {
    const updatedIncomes = incomes.filter((income) => income.id !== id);
    setIncomes(updatedIncomes);

    const user = getCurrentUser() || {};
    const updatedUser = {
      ...user,
      additionalIncome: updatedIncomes,
    };
    setCurrentUser(updatedUser);
  }

  return (
    <div className="additional-income-container">
      <h2 className="additional-income-title">Additional Income</h2>
      <button className="back-btn" onClick={handleBack}>
        <img src={backBtn} alt="Back" />
      </button>
      <form className="income-form" onSubmit={handleSubmit}>
        <label>
          Company / Platform Name
          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            placeholder="Amazon, Fiverr..."
            required
          />
        </label>

        <label>
          Work Type
          <select
            name="workType"
            value={formData.workType}
            onChange={handleChange}
            required
          >
            <option value="">Select work type</option>
            {workTypes.map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </select>
        </label>

        <label>
          Work Mode
          <select
            name="workMode"
            value={formData.workMode}
            onChange={handleChange}
            required
          >
            <option value="">Select work mode</option>
            {workModes.map((mode, index) => (
              <option key={index} value={mode}>
                {mode}
              </option>
            ))}
          </select>
        </label>

        <label>
          Monthly Earning ($ / AZN)
          <input
            type="number"
            name="monthlyIncome"
            value={formData.monthlyIncome}
            onChange={handleChange}
            placeholder="500"
            required
          />
        </label>

        <label>
          Payment Schedule
          <select
            name="paymentFrequency"
            value={formData.paymentFrequency}
            onChange={handleChange}
            required
          >
            <option value="">Select payment schedule</option>
            {paymentFrequencies.map((freq, index) => (
              <option key={index} value={freq}>
                {freq}
              </option>
            ))}
          </select>
        </label>

        <label>
          Start On
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          End On (Optional)
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
          />
        </label>

        <label className="textarea-span">
          Details or Comments (Optional)
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            maxLength={150}
            placeholder="Describe your work role or task briefly (max 150 chars)..."
          />
          <p>{formData.description.length}/150</p>
        </label>

        <button type="submit">Add Income</button>
      </form>

      <h3>My Income Sources</h3>
      <div className="income-table-wrapper">
        <table className="income-table">
          <thead>
            <tr>
              <th>Company</th>
              <th>Work Type</th>
              <th>Work Mode</th>
              <th>Monthly Income</th>
              <th>Schedule</th>
              <th>Start</th>
              <th>End</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {incomes.length > 0 ? (
              incomes.map((income) => (
                <React.Fragment key={income.id}>
                  <tr>
                    <td>{income.companyName}</td>
                    <td>{income.workType}</td>
                    <td>{income.workMode}</td>
                    <td>{income.monthlyIncome}</td>
                    <td>{income.paymentFrequency}</td>
                    <td className="ExtraWorkStartDate">{income.startDate}</td>
                    <td className="ExtraWorkEndDate">{income.endDate || "-"}</td>
                    <td rowSpan="2">
                      <button className="delete-btn" onClick={() => handleDelete(income.id)}>x</button>
                    </td>
                  </tr>
                  <tr className="notes-row">
                    <td colSpan="7" className="notes-cell">
                      {income.description || "No notes"}
                    </td>
                  </tr>
                </React.Fragment>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="no-data">No additional income sources added yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdditionalIncome;