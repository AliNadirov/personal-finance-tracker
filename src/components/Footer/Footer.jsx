import { Link } from "react-router-dom";
import logofooter from "../../assets/images/main_logo.svg";
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
        <Link to="/about">About</Link>
        <Link to="/support">Support</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/privacy-policy">Privacy</Link>
        <Link to="/terms-of-use">Terms</Link>
      </div>
    </footer>
  );
}

export default Footer;