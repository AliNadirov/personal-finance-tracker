import "./TermOfUse.css";
import { useNavigate } from "react-router-dom";

const termsSections = [
  {
    title: "1. Introduction",
    content: (
      <>
        <p>
          Welcome to <strong>BudgetBee</strong>, a personal finance tracker designed to help users
          manage income, expenses, savings, and budgeting more efficiently. These Terms of Use
          (“Terms”) govern your access to and use of the BudgetBee website, application, and related
          services (collectively, the “Service”).
        </p>
        <p>
          By creating an account or using BudgetBee, you agree to be bound by these Terms and our
          Privacy Policy. If you do not agree, you should not use the Service.
        </p>
      </>
    ),
  },
  {
    title: "2. Eligibility and Account",
    content: (
      <>
        <p>
          To use BudgetBee, you must be at least 16 years old or have appropriate parental consent.
          You are responsible for maintaining the confidentiality of your account credentials and for
          all activity that occurs under your account.
        </p>
        <p>
          BudgetBee is intended for <strong>personal use only</strong>. Commercial misuse, automated
          abuse, or unauthorized access attempts are strictly prohibited.
        </p>
      </>
    ),
  },
  {
    title: "3. User Responsibilities",
    content: (
      <>
        <p>
          You agree to use BudgetBee lawfully and responsibly. In particular, you must not:
        </p>
        <ul className="terms-list">
          <li>Enter false, misleading, or fraudulent information;</li>
          <li>Attempt to access another user's account or data without permission;</li>
          <li>Interfere with the Service, infrastructure, or security systems;</li>
          <li>Use BudgetBee to support illegal, abusive, or harmful activity.</li>
        </ul>
        <p>
          You remain responsible for the accuracy of the financial information you enter, including
          income, expenses, budgets, and savings goals.
        </p>
      </>
    ),
  },
  {
    title: "4. Data and Privacy",
    content: (
      <>
        <p>
          We value user privacy and take reasonable steps to protect personal information. Financial
          data entered into BudgetBee is used to provide insights, summaries, charts, and budgeting
          functionality within the user experience.
        </p>
        <p>
          We do not sell personal financial information. For more information about how data is
          collected, used, and safeguarded, please review our{" "}
          <a className="terms-link" href="/privacy-policy">
            Privacy Policy
          </a>
          .
        </p>
      </>
    ),
  },
  {
    title: "5. Accuracy and Disclaimer",
    content: (
      <>
        <p>
          BudgetBee is intended as a financial tracking and self-management tool. Reports, analytics,
          and projections depend on the accuracy and completeness of the data provided by the user.
        </p>
        <p>
          BudgetBee does not guarantee that calculations, forecasts, or summaries will always be
          error-free, and the Service does not constitute financial, tax, legal, or investment advice.
        </p>
      </>
    ),
  },
  {
    title: "6. Security",
    content: (
      <>
        <p>
          We take reasonable administrative and technical measures to protect user accounts and data.
          However, no system can be guaranteed to be completely secure.
        </p>
        <p>
          Users are responsible for maintaining the security of their devices, passwords, and login
          credentials. BudgetBee will never request passwords or sensitive financial credentials by
          email.
        </p>
      </>
    ),
  },
  {
    title: "7. Service Changes",
    content: (
      <>
        <p>
          BudgetBee may update, modify, suspend, or discontinue features at any time to improve the
          platform, maintain security, or support product development.
        </p>
        <p>
          When these Terms are updated, the revised version will be reflected by the “Last updated”
          date shown on this page. Continued use of the Service after updates means you accept the
          revised Terms.
        </p>
      </>
    ),
  },
  {
    title: "8. Limitation of Liability",
    content: (
      <>
        <p>
          To the maximum extent permitted by law, BudgetBee and its developers shall not be liable for
          indirect, incidental, special, consequential, or exemplary damages arising from the use of,
          or inability to use, the Service.
        </p>
        <p>
          This includes, without limitation, loss of data, lost profits, financial inaccuracies, or
          interruption of service.
        </p>
      </>
    ),
  },
  {
    title: "9. Termination",
    content: (
      <>
        <p>
          We reserve the right to suspend or terminate access to BudgetBee where misuse, abuse,
          security risks, or violations of these Terms are identified.
        </p>
        <p>
          Upon termination, certain account data may be removed or retained as required for legal,
          operational, or security purposes.
        </p>
      </>
    ),
  },
  {
    title: "10. Contact",
    content: (
      <>
        <p>
          For questions regarding these Terms or the BudgetBee Service, please contact our support
          team at{" "}
          <a className="terms-link" href="mailto:support@budgetbee.com">
            support@budgetbee.com
          </a>
          .
        </p>
      </>
    ),
  },
];

const TermOfUse = () => {
  const navigate = useNavigate();

  return (
    <main className="terms-page">
      <div className="terms-shell">
        <div className="terms-header">
          <span className="terms-badge">Legal</span>
          <h1 className="terms-title">Terms of Use</h1>
          <p className="terms-subtitle">
            These terms explain the rules, responsibilities, and limitations that apply when using
            BudgetBee.
          </p>
          <p className="terms-date">Last updated: December 2025</p>
        </div>

        <div className="terms-card">
          {termsSections.map((section) => (
            <section className="terms-section" key={section.title}>
              <h2 className="terms-section-title">{section.title}</h2>
              <div className="terms-section-content">{section.content}</div>
            </section>
          ))}

          <div className="terms-actions">
            <button
              className="terms-back-btn"
              type="button"
              onClick={() => navigate("/dashboard")}
            >
              ← Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default TermOfUse;