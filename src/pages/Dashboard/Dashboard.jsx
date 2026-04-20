import { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import Budget from "../Dashboard/Budget/Budget";
import RecentTransactions from "../Dashboard/RecentTransactions/RecentTransactions";
import Summary from "../Dashboard/Summary/Summary";
import Footer from "../../components/Footer/Footer";
import CalendarSummary from "./CalendarSummary/CalendarSummary";
import IncomeExpensesChart from "./IncomeExpensesChart/IncomeExpensesChart";
import pie from "../../assets/images/pie.png";
import Sidebar from "./Sidebar/Sidebar";
import { getCurrentUser, getTransactions } from "../../services/storage";
import mockTransactions from "../../data/mock_transactions.json";
import "./Dashboard.css";

function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [userBudget, setUserBudget] = useState(8000);
  const [latestMonthExpenses, setLatestMonthExpenses] = useState(0);

  const loadUserBudget = () => {
    const currentUser = getCurrentUser();
    if (currentUser && currentUser.budget) {
      setUserBudget(Number(currentUser.budget));
    }
  };

  const calculateLatestMonthExpenses = () => {
    const storedTransactions = getTransactions();
    const allTransactions = [...mockTransactions, ...storedTransactions];

    if (allTransactions.length === 0) {
      setLatestMonthExpenses(0);
      return;
    }

    const latestTimestamp = Math.max(
      ...allTransactions.map((t) => new Date(t.date).getTime())
    );

    const latestDate = new Date(latestTimestamp);
    const latestMonth = latestDate.getMonth();
    const latestYear = latestDate.getFullYear();

    const latestMonthTransactions = allTransactions.filter((t) => {
      const d = new Date(t.date);
      return d.getMonth() === latestMonth && d.getFullYear() === latestYear;
    });

    const total = latestMonthTransactions.reduce(
      (sum, t) => sum + Number(t.amount),
      0
    );

    setLatestMonthExpenses(total);
  };

  useEffect(() => {
    loadUserBudget();
    calculateLatestMonthExpenses();

    const handleStorageChange = (e) => {
      if (e.key === "currentUser" || e.key === "transactions") {
        loadUserBudget();
        calculateLatestMonthExpenses();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="dashboard">
      <Header onMenuClick={toggleSidebar} />
      <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />

      <main className="dashboard-content">
        <section className="charts">
          <div className="line-chart">
            <IncomeExpensesChart userBudget={userBudget} />
          </div>

          <div className="pie-section">
            <img src={pie} alt="Pie Chart" />

            <div className="pie-bottom">
              <CalendarSummary />
            </div>
          </div>
        </section>

        <aside className="side-content">
          <div className="budget-panel">
            <div className="summary-boxes">
              <Summary
                title="Budget"
                value={`$${userBudget.toFixed(2)}`}
                type="income"
              />
              <Summary
                title="Spent"
                value={`$${latestMonthExpenses.toFixed(2)}`}
                type="expenses"
              />
            </div>

            <Budget budget={userBudget} />
          </div>

          <div className="aside-down-panel">
            <RecentTransactions />
          </div>
        </aside>
      </main>

      <Footer />
    </div>
  );
}

export default Dashboard;