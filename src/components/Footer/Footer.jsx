import { Link } from "react-router-dom";
import logofooter from "../../assets/images/main_logo.svg";
import facebook from "../../assets/icons/facebook.png";
import linkedin from "../../assets/icons/linkedin.png";
import telegram from "../../assets/icons/telegram.png";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-links">
        <a href="#">Privacy Policy</a>
        <Link to="/support">Support</Link>
        <Link to="/terms-of-use">Terms of use</Link>
        <a href="/about">About</a>
      </div>

      <div className="footer-logo">
        <img src={logofooter} alt="logo" />
      </div>

      <div className="footer-contact">
        <Link to="/contact">Contact us</Link>

        <div className="social-icons">
          <img src={linkedin} alt="linkedin" />
          <img src={facebook} alt="facebook" />
          <img src={telegram} alt="telegram" />
        </div>
      </div>
    </footer>
  );
}

export default Footer;