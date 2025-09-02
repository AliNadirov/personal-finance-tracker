
import { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import Budget from "../Dashboard/Budget/Budget";
import RecentTransactions from "../Dashboard/RecentTransactions/RecentTransactions";
import Summary from "../Dashboard/Summary/Summary";
import Footer from "../../components/Footer/Footer";
import line from "../../assets/images/line.png";
import pie from "../../assets/images/pie.png";
import MonthSalary from "../Dashboard/MonthlySalary/MonthlySalary";
import Sidebar from "./Sidebar/Sidebar";
import { getCurrentUser, getTransactions } from "../../services/storage";
import mockTransactions from "../../data/mock_transactions.json";
import "./Dashboard.css";

function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [userBudget, setUserBudget] = useState(2000);
  const [totalExpenses, setTotalExpenses] = useState(0);

  const loadUserBudget = () => {
    const currentUser = getCurrentUser();
    if (currentUser && currentUser.budget) {
      setUserBudget(Number(currentUser.budget));
    }
  };

  const calculateTotalExpenses = () => {
    const storedTransactions = getTransactions();
    const allTransactions = [...mockTransactions, ...storedTransactions];
    const total = allTransactions.reduce((sum, transaction) => sum + transaction.amount, 0);
    setTotalExpenses(total);
  };

  useEffect(() => {
    loadUserBudget();
    calculateTotalExpenses();

    const handleStorageChange = (e) => {
      if (e.key === "currentUser" || e.key === "transactions") {
        loadUserBudget();
        calculateTotalExpenses();
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="dashboard">
      <Header onMenuClick={toggleSidebar} />
      <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
      <main className="dashboard-content">
        <section className="charts">
          <div className="line-chart">
            <h2>Income vs. Expenses</h2>
            <img src={line} alt="Line Chart" />
          </div>
          <div className="pie-chart">
            <img src={pie} alt="Pie Chart" />
          </div>
        </section>
        <aside className="side-content">
          <div className="budget-panel">
            <div className="summary-boxes">
              <Summary title="Income" value={`$${userBudget.toFixed(2)}`} type="income" />
              <Summary title="Expenses" value={`$${totalExpenses.toFixed(2)}`} type="expenses" />
            </div>
            <Budget budget={userBudget} />
          </div>
          <div className="aside-down-panel">
            <RecentTransactions />
            <div className="monthly-salary">
              <MonthSalary />
            </div>
          </div>
        </aside>
      </main>
      <Footer />
    </div>
  );
}

export default Dashboard;