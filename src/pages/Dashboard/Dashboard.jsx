import { useState, useEffect } from "react";
import Header from "./Header/Header";
import Budget from "../Dashboard/Budget/Budget";
import RecentTransactions from "../Dashboard/RecentTransactions/RecentTransactions";
import Summary from "../Dashboard/Summary/Summary";
import Footer from "./Footer/Footer";
import CalendarSummary from "./CalendarSummary/CalendarSummary";
import IncomeExpensesChart from "./IncomeExpensesChart/IncomeExpensesChart";
import PieChartBox from "./PieChartBox/PieChartBox";
import Sidebar from "./Sidebar/Sidebar";
import { getCurrentUser, getTransactions } from "../../services/storage";
import mockTransactions from "../../data/mock_transactions.json";
import "./Dashboard.css";

function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [userBudget, setUserBudget] = useState(0);
  const [totalMonthlyIncome, setTotalMonthlyIncome] = useState(0);
  const [latestMonthExpenses, setLatestMonthExpenses] = useState(0);

  const loadUserFinancials = () => {
    const currentUser = getCurrentUser();

    const monthlyBudget = Number(currentUser?.monthlyBudget ?? 0);

    const mainIncomeTotal = (currentUser?.mainIncomeSources || []).reduce(
      (total, income) => total + Number(income.monthlyIncome || 0),
      0
    );

    const additionalIncomeTotal = (currentUser?.additionalIncome || []).reduce(
      (total, income) => total + Number(income.monthlyIncome || 0),
      0
    );

    setUserBudget(monthlyBudget);
    setTotalMonthlyIncome(mainIncomeTotal + additionalIncomeTotal);
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
    loadUserFinancials();
    calculateLatestMonthExpenses();

    const handleStorageChange = (e) => {
      if (e.key === "currentUser" || e.key === "transactions") {
        loadUserFinancials();
        calculateLatestMonthExpenses();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const openSidebar = () => setIsSidebarOpen(true);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className="dashboard">
      <Header onMenuClick={openSidebar} />
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />

      <main className="dashboard-content">
        <section className="charts">
          <div className="line-chart">
            <IncomeExpensesChart userBudget={userBudget} />
          </div>

          <div className="pie-section">
            <PieChartBox />

            <div className="pie-bottom">
              <CalendarSummary />
            </div>
          </div>
        </section>

        <aside className="side-content">
          <div className="budget-panel">
            <div className="summary-boxes">
              <Summary
                title="Total Income"
                value={`$${totalMonthlyIncome.toFixed(2)}`}
                type="income"
              />

              <Summary
                title="Total Expenses"
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