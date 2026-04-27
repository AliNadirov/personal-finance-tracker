import { Link, useNavigate } from "react-router-dom";
import "./About.css";
import logo from "../../assets/images/main_logo.png";

const aboutHighlights = [
  {
    title: "Smart expense visibility",
    text: "Track income, expenses, and balances in one place with a clear and focused dashboard experience.",
  },
  {
    title: "Better budgeting habits",
    text: "Set goals, monitor spending patterns, and stay more aware of where your money goes each month.",
  },
  {
    title: "Designed for clarity",
    text: "BudgetBee is built to make personal finance feel more approachable, organized, and less overwhelming.",
  },
];

const aboutValues = [
  "Simple financial tracking without unnecessary complexity",
  "Clear reporting that helps users understand spending behavior",
  "A product experience focused on usability, trust, and consistency",
  "A scalable foundation for smarter finance tools in future updates",
];

const About = () => {
  const navigate = useNavigate();

  return (
    <main className="about-page">
      <div className="about-shell">
        <header className="about-hero">
          <div className="about-top-row">
            <Link to="/dashboard" className="about-logo-link" aria-label="Go to Dashboard">
              <img src={logo} alt="BudgetBee Logo" className="about-logo" />
            </Link>

            <span className="about-badge"> About BudgetBee </span>
          </div>

          <h1 className="about-title">
            A modern personal finance tracker built for clarity, control, and better daily decisions.
          </h1>

          <p className="about-description">
            BudgetBee helps users organize spending, monitor income, and build stronger financial habits
            through a clean and approachable product experience. The goal is simple: make personal
            finance easier to understand and easier to manage.
          </p>

          <div className="about-actions">
            <button
              type="button"
              className="about-primary-btn"
              onClick={() => navigate("/dashboard")}
            >
              Back to Dashboard
            </button>

            <Link to="/support" className="about-secondary-btn">
              Contact Support
            </Link>
          </div>
        </header>

        <section className="about-section about-grid-section">
          <div className="about-section-heading">
            <span className="about-section-label">What we do</span>
            <h2>Built to make money management feel simpler and more practical</h2>
          </div>

          <div className="about-highlights-grid">
            {aboutHighlights.map((item) => (
              <article className="about-card" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="about-section">
          <div className="about-content-card">
            <div className="about-content-block">
              <span className="about-section-label">Our mission</span>
              <h2>Helping users build confidence in their financial routine</h2>
              <p>
                BudgetBee is designed for people who want a clearer view of their finances without
                dealing with clutter, confusion, or overly technical tools. From everyday expense
                tracking to broader budgeting awareness, the platform is meant to support better
                habits over time.
              </p>
            </div>

            <div className="about-content-block">
              <span className="about-section-label">Our vision</span>
              <h2>Turning a simple tracker into a more complete finance companion</h2>
              <p>
                The long-term direction for BudgetBee is to evolve beyond basic tracking into a more
                complete personal finance product, with smarter insights, stronger planning tools, and
                a more connected financial overview.
              </p>
            </div>
          </div>
        </section>

        <section className="about-section">
          <div className="about-values-card">
            <div className="about-section-heading about-section-heading-left">
              <span className="about-section-label">Why BudgetBee</span>
              <h2>Product principles behind the experience</h2>
            </div>

            <ul className="about-values-list">
              {aboutValues.map((value) => (
                <li key={value}>{value}</li>
              ))}
            </ul>
          </div>
        </section>

        <footer className="about-footer">
          <p>© 2025 BudgetBee. All rights reserved.</p>
        </footer>
      </div>
    </main>
  );
};

export default About;