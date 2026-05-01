import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, BriefcaseBusiness, Plus, Trash2, Wallet } from "lucide-react";
import { getCurrentUser, setCurrentUser } from "../../../services/storage.js";
import { useCurrentUser } from "../../../hooks/useCurrentUser.js";
import { formatCurrency } from "../../../utils/currency.js";
import mockMainIncomeSources from "../../../data/mockMainIncomeSources.json";
import mockAdditionalIncome from "../../../data/mockAdditionalIncome.json";
import "./IncomeSources.css";

const workTypes = [
  "Freelance",
  "Part-time",
  "Gig/Task-based",
  "Remote/Online job",
  "Passive Income",
];

const workModes = ["Offline", "Online", "Hybrid"];
const paymentFrequencies = ["Weekly", "Monthly", "Per Project"];

const initialFormData = {
  companyName: "",
  workType: "",
  workMode: "",
  monthlyIncome: "",
  paymentFrequency: "",
  startDate: "",
  endDate: "",
  description: "",
};

function IncomeSources() {
  const navigate = useNavigate();
  const currentUser = useCurrentUser();
  const currency = currentUser?.currency || "USD";

  const [formData, setFormData] = useState(initialFormData);
  const [mainIncomeSources, setMainIncomeSources] = useState([]);
  const [additionalIncomeSources, setAdditionalIncomeSources] = useState([]);

  useEffect(() => {
    const storedUser = getCurrentUser();
    const currentUserId = storedUser?.id || "default";

    const userMainIncome = mockMainIncomeSources.filter(
      (income) => income.userId === currentUserId
    );

    const userAdditionalIncome = mockAdditionalIncome.filter(
      (income) => income.userId === currentUserId
    );

    const defaultMainIncome = mockMainIncomeSources.filter(
      (income) => income.userId === "default"
    );

    const defaultAdditionalIncome = mockAdditionalIncome.filter(
      (income) => income.userId === "default"
    );

    const selectedMainIncome =
      storedUser?.mainIncomeSources?.length > 0
        ? storedUser.mainIncomeSources
        : userMainIncome.length > 0
        ? userMainIncome
        : defaultMainIncome;

    const selectedAdditionalIncome =
      storedUser?.additionalIncome?.length > 0
        ? storedUser.additionalIncome
        : userAdditionalIncome.length > 0
        ? userAdditionalIncome
        : defaultAdditionalIncome;

    setMainIncomeSources(selectedMainIncome);
    setAdditionalIncomeSources(selectedAdditionalIncome);

    if (storedUser) {
      setCurrentUser({
        ...storedUser,
        mainIncomeSources: selectedMainIncome,
        additionalIncome: selectedAdditionalIncome,
      });

      window.dispatchEvent(new Event("budgetbee:user-updated"));
    }
  }, []);

  const allIncomeSources = useMemo(() => {
    return [
      ...mainIncomeSources.map((income) => ({
        ...income,
        displayName: income.sourceName,
        displayType: income.incomeType,
        category: "Main Income",
      })),
      ...additionalIncomeSources.map((income) => ({
        ...income,
        displayName: income.companyName,
        displayType: income.workType,
        category: "Additional Income",
      })),
    ];
  }, [mainIncomeSources, additionalIncomeSources]);

  const totalMonthlyIncome = useMemo(() => {
    return allIncomeSources.reduce(
      (total, income) => total + Number(income.monthlyIncome || 0),
      0
    );
  }, [allIncomeSources]);

  const mainMonthlyIncome = useMemo(() => {
    return mainIncomeSources.reduce(
      (total, income) => total + Number(income.monthlyIncome || 0),
      0
    );
  }, [mainIncomeSources]);

  const additionalMonthlyIncome = useMemo(() => {
    return additionalIncomeSources.reduce(
      (total, income) => total + Number(income.monthlyIncome || 0),
      0
    );
  }, [additionalIncomeSources]);

  const activeSources = useMemo(() => {
    return allIncomeSources.filter((income) => !income.endDate).length;
  }, [allIncomeSources]);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function saveAdditionalIncome(updatedAdditionalIncome) {
    setAdditionalIncomeSources(updatedAdditionalIncome);

    const user = getCurrentUser() || {};

    setCurrentUser({
      ...user,
      mainIncomeSources,
      additionalIncome: updatedAdditionalIncome,
    });

    window.dispatchEvent(new Event("budgetbee:user-updated"));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const newIncome = {
      ...formData,
      id: Date.now(),
      userId: getCurrentUser()?.id || "default",
      monthlyIncome: Number(formData.monthlyIncome),
    };

    saveAdditionalIncome([...additionalIncomeSources, newIncome]);
    setFormData(initialFormData);
  }

  function handleDelete(id) {
    const updatedAdditionalIncome = additionalIncomeSources.filter(
      (income) => income.id !== id
    );

    saveAdditionalIncome(updatedAdditionalIncome);
  }

  return (
    <main className="income-page">
      <section className="income-shell">
        <button
          type="button"
          className="income-back-btn"
          onClick={() => navigate("/dashboard")}
          aria-label="Back to dashboard"
        >
          <ArrowLeft size={22} strokeWidth={2.4} />
        </button>

        <header className="income-header">
          <p className="income-label">Earnings Overview</p>
          <h1>Income Sources</h1>
          <p>
            Manage your main salary, side jobs, freelance work, and passive
            income in one clean dashboard.
          </p>
        </header>

        <section className="income-stats">
          <article className="income-stat-card">
            <span>Total Monthly Income</span>
            <strong>{formatCurrency(totalMonthlyIncome, currency)}</strong>
          </article>

          <article className="income-stat-card">
            <span>Main Income</span>
            <strong>{formatCurrency(mainMonthlyIncome, currency)}</strong>
          </article>

          <article className="income-stat-card">
            <span>Additional Income</span>
            <strong>{formatCurrency(additionalMonthlyIncome, currency)}</strong>
          </article>
        </section>

        <section className="income-form-card">
          <div className="section-heading">
            <div>
              <p className="section-kicker">Additional Income</p>
              <h2>Add Side Income Source</h2>
            </div>
            <span>{formData.description.length}/150</span>
          </div>

          <form className="income-form" onSubmit={handleSubmit}>
            <label>
              Company / Platform Name
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                placeholder="Upwork, Fiverr, Airbnb..."
                required
              />
            </label>

            <label>
              Income Type
              <select
                name="workType"
                value={formData.workType}
                onChange={handleChange}
                required
              >
                <option value="">Select income type</option>
                {workTypes.map((type) => (
                  <option key={type} value={type}>
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
                {workModes.map((mode) => (
                  <option key={mode} value={mode}>
                    {mode}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Monthly Income
              <input
                type="number"
                name="monthlyIncome"
                value={formData.monthlyIncome}
                onChange={handleChange}
                placeholder="500"
                min="0"
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
                {paymentFrequencies.map((frequency) => (
                  <option key={frequency} value={frequency}>
                    {frequency}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Start Date
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              End Date
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
              />
            </label>

            <label className="textarea-span">
              Notes
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                maxLength={150}
                placeholder="Describe work details or client notes..."
              />
            </label>

            <button type="submit" className="income-submit-btn">
              <Plus size={18} />
              Add Income Source
            </button>
          </form>
        </section>

        <section className="income-list-card">
          <div className="section-heading">
            <div>
              <p className="section-kicker">Saved Sources</p>
              <h2>Your Income Portfolio</h2>
            </div>
            <span>{activeSources} active</span>
          </div>

          <div className="income-cards-grid">
            {allIncomeSources.map((income) => (
              <article
                className="income-source-card"
                key={`${income.category}-${income.id}`}
              >
                <div className="income-source-top">
                  <div className="income-source-icon">
                    {income.category === "Main Income" ? (
                      <BriefcaseBusiness size={20} />
                    ) : (
                      <Wallet size={20} />
                    )}
                  </div>

                  <span
                    className={
                      income.category === "Main Income"
                        ? "income-category-badge main"
                        : "income-category-badge additional"
                    }
                  >
                    {income.category}
                  </span>
                </div>

                <h3>{income.displayName}</h3>
                <p>{income.description || "No notes added"}</p>

                <div className="income-card-details">
                  <span>{income.displayType}</span>
                  <span>{income.workMode}</span>
                  <span>{income.paymentFrequency}</span>
                </div>

                <div className="income-card-footer">
                  <strong>{formatCurrency(income.monthlyIncome, currency)}</strong>

                  {income.category === "Additional Income" ? (
                    <button
                      type="button"
                      className="income-delete-btn"
                      onClick={() => handleDelete(income.id)}
                      aria-label={`Delete ${income.displayName}`}
                    >
                      <Trash2 size={16} />
                    </button>
                  ) : (
                    <span className="locked-income">Primary</span>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}

export default IncomeSources;