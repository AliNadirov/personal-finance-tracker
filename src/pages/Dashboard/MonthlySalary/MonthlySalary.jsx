import { useState } from "react";
import calendarIcon from "../../../assets/images/calendar.png";
import "./MonthlySalary.css"

function MonthlySalary() {
  const [selectedMonth] = useState(
    `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, "0")}`
  );

  const salaryData = {
    "2025-07": { salary: 2000, spent: 1450 },
    "2025-08": { salary: 2200, spent: 1600 },
    "2025-09": { salary: 2100, spent: 1300 },
  };

  const currentData = salaryData[selectedMonth] || { salary: 0, spent: 0 };

  return (
    <div className="monthly-salary">
      <div className="monthly-header">
        <h3>Choose month</h3>
        <div className="monthly-picker">
          <button className="calendar-btn">
            <img src={calendarIcon} alt="Calendar" />
          </button>
        </div>
      </div>

      <div className="salary-info">
  <p className="income">
    <strong>Income:</strong> ${currentData.salary}
  </p>
  <p className="expenses">
    <strong>Expenses:</strong> ${currentData.spent}
  </p>
  <p className="net">
    <strong>Net:</strong> ${currentData.salary - currentData.spent}
  </p>
</div>
    </div>
  );
}

export default MonthlySalary;
