import { useState } from "react";
import Header from "../../components/Header/Header"
import Budget from "../Dashboard/Budget/Budget"
import RecentTransactions from "../Dashboard/RecentTransactions/RecentTransactions";
import Summary from "../Dashboard/Summary/Summary";
import Footer from "../../components/Footer/Footer";
import line from "../../assets/images/line.png"
import pie from "../../assets/images/pie.png"
import "./Dashboard.css"
import MonthSalary from "../Dashboard/MonthlySalary/MonthlySalary"
import Sidebar from "./Sidebar/Sidebar";

function Dashboard() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
                    <div className="summary-boxes">
                        <Summary title="Income" value="$2000" type="income" />
                        <Summary title="Expenses" value="$1200" type="expenses" />
                    </div>

                    <Budget />
                    <RecentTransactions />

                    <div className="monthly-salary">
                        <MonthSalary />
                    </div>
                </aside>
            </main>
            <Footer />
        </div>
    )
}

export default Dashboard;
