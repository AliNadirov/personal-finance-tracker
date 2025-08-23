import { Link } from "react-router-dom";
import budgetBeeLogo from "../../assets/images/Logo4.png";
import rightPanelImage from "../../assets/images/Logo3.png";
import "./Home.css";

export default function Home() {
  return (
    <div className="home-page-container">
      <div className="home-page-content">
        <div className="left-side-section">
          <div className="logo-panel">
            <img src={budgetBeeLogo} alt="BudgetBee Logo" className="logo" />
            <h1 className="appName">BudgetBee</h1>
          </div>

          <h2 className="description-title">Your personal finance tracker</h2>

          <p className="description">
            Personal expense tracker is your ultimate tool for effortless income and expense management.
            Streamline your financial tracking with intuitive categorization and insightful reports.
            Personal expense tracker is a meticulously designed application tailored to simplify your financial life.
            This user-centric platform empowers you to efficiently track and manage your finances with ease and precision.
          </p>

          <div className="button-container">
            <Link to="/login">
              <button className="home-page-login-btn">Login</button>
            </Link>

            <Link to="/signup">
              <button className="home-page-create-btn">Create Account</button>
            </Link>
          </div>
        </div>

        <div className="right-side-section">
          <img
            src={rightPanelImage}
            alt="rightPanelImage"
            className="rightPanelImage"
          />
        </div>
      </div>
    </div>
  );
}