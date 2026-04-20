import { useState, useEffect } from "react";
import "./CalendarSummary.css";
import mockTransactions from "../../../data/mock_transactions.json";
import { getTransactions, getCurrentUser } from "../../../services/storage";

function CalendarSummary() {
  const today = new Date();

  const [selectedDate, setSelectedDate] = useState(today);
  const [currentMonth, setCurrentMonth] = useState(today);
  const [allTransactions, setAllTransactions] = useState([]);
  const [budget, setBudget] = useState(8000);

  useEffect(() => {
    const stored = getTransactions();
    setAllTransactions([...mockTransactions, ...stored]);

    const user = getCurrentUser();
    if (user?.budget) setBudget(Number(user.budget));
  }, []);

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const filteredTransactions = allTransactions.filter((t) => {
    const d = new Date(t.date);
    return (
      d.getFullYear() === selectedDate.getFullYear() &&
      d.getMonth() === selectedDate.getMonth() &&
      d.getDate() <= selectedDate.getDate()
    );
  });

  const totalSpent = filteredTransactions.reduce(
    (sum, t) => sum + t.amount,
    0
  );

  const remaining = budget - totalSpent;

  const selectedDayTransactions = allTransactions.filter((t) => {
    const d = new Date(t.date);
    return (
      d.getFullYear() === selectedDate.getFullYear() &&
      d.getMonth() === selectedDate.getMonth() &&
      d.getDate() === selectedDate.getDate()
    );
  });

  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const goPrevMonth = () => {
    const newDate = new Date(year, month - 1, 1);
    setCurrentMonth(newDate);
    setSelectedDate(newDate);
  };

  const goNextMonth = () => {
    const newDate = new Date(year, month + 1, 1);
    setCurrentMonth(newDate);
    setSelectedDate(newDate);
  };

  return (
    <div className="calendar-summary">

      <div className="calendar-box">
        <div className="calendar-header">
          <button onClick={goPrevMonth}>←</button>

          <h3>
            {currentMonth.toLocaleString("default", { month: "long" })} {year}
          </h3>

          <button onClick={goNextMonth}>→</button>
        </div>

        <div className="calendar-grid">
          {daysArray.map((day) => {
            const isSelected = day === selectedDate.getDate();

            const dayTotal = allTransactions
              .filter((t) => {
                const d = new Date(t.date);
                return (
                  d.getFullYear() === year &&
                  d.getMonth() === month &&
                  d.getDate() === day
                );
              })
              .reduce((sum, t) => sum + t.amount, 0);

            return (
              <div
                key={day}
                className={`calendar-day ${isSelected ? "active" : ""} ${day === today.getDate() &&
                  month === today.getMonth() &&
                  year === today.getFullYear()
                  ? "today"
                  : ""
                  }`}
                onClick={() => setSelectedDate(new Date(year, month, day))}
              >

                <div className="day-number">{day}</div>
                {dayTotal > 0 && (
                  <div className="day-amount">
                    ${dayTotal.toFixed(0)}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="summary-box">
        <h4>{selectedDate.toLocaleDateString()}</h4>

        <div className="summary-row income">
          <span>Budget</span>
          <strong>${budget.toFixed(2)}</strong>
        </div>

        <div className="summary-row expenses">
          <span>Spent</span>
          <strong>${totalSpent.toFixed(2)}</strong>
        </div>

        <div className="summary-row remaining">
          <span>Left</span>
          <strong>${remaining.toFixed(2)}</strong>
        </div>

        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{
              width: `${budget > 0 ? Math.min((totalSpent / budget) * 100, 100) : 0}%`
            }}
          />
        </div>

        <div className="day-transactions">
          <h5>Transactions</h5>

          {selectedDayTransactions.length === 0 ? (
            <p>No transactions</p>
          ) : (
            selectedDayTransactions.map((t, index) => (
              <div key={`${t.id}-${t.date}-${index}`} className="day-item">
                <span>{t.type}</span>
                <strong>${t.amount}</strong>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default CalendarSummary;