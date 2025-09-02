import { Link } from "react-router-dom";
import "./About.css";
import logo from "../../assets/images/Logo5.png";
const About = () => {
  return (
    <div className="about-container">
      <header className="about-header">
        <Link to="/dashboard">
          <img src={logo} alt="BudgetBee Logo" className="about-logo" />
        </Link>
        <h1 className="about-title">About BudgetBee</h1>
      </header>

      <p className="about-description">
        Welcome to <strong>BudgetBee</strong>, your friendly personal finance tracker!
        Our mission is to help you take control of your finances effortlessly and make
        smarter decisions with your money.
      </p>

      <div className="about-section">
        <h2>Our Vision</h2>
        <p>
          We aim to simplify budgeting and expense tracking so that everyone can
          achieve their financial goals without stress. BudgetBee is designed to
          give you clarity and insight into your spending habits.
        </p>
      </div>

      <div className="about-section">
        <h2>Features</h2>
        <ul>
          <li>Track your income and expenses in real-time</li>
          <li>Visualize your spending with charts and graphs</li>
          <li>Set budgets and get notifications when you exceed them</li>
          <li>Gain insights to improve your financial health</li>
        </ul>
      </div>

      <div className="about-section">
        <h2>Why Choose BudgetBee?</h2>
        <p>
          BudgetBee is intuitive, secure, and tailored for anyone who wants to
          take charge of their finances. Whether you're saving for a big purchase
          or just want to manage daily expenses, BudgetBee makes it easy.
        </p>
      </div>

      <footer className="about-footer">
        <p>© 2025 BudgetBee. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default About;