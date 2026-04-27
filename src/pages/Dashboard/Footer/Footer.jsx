import { Link } from "react-router-dom";
import logofooter from "../../../assets/images/main_logo.png";
import "./Footer.css";

function Footer() {
  return (
    <footer className="dashboard-footer">
      <div className="dashboard-footer-left">
        <img
          src={logofooter}
          alt="BudgetBee logo"
          className="dashboard-footer-logo"
        />
        <span className="dashboard-footer-copy">© 2026 BudgetBee</span>
      </div>

      <div className="dashboard-footer-links">
        <Link to="/support">Support</Link>
        <Link to="/privacy-policy">Privacy Policy</Link>
        <Link to="/terms-of-use">Terms of Use</Link>
      </div>
    </footer>
  );
}

export default Footer;