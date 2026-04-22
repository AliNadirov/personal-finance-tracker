import "./PrivacyPolicy.css";
import { useNavigate } from "react-router-dom";

const privacySections = [
  {
    title: "1. Overview",
    content: (
      <>
        <p>
          At <strong>BudgetBee</strong>, privacy is treated as a core part of the product experience.
          This Privacy Policy explains how we collect, use, store, and protect information when users
          access our website, application, and related services.
        </p>
        <p>
          By using BudgetBee, you acknowledge that your information may be processed as described in
          this Policy.
        </p>
      </>
    ),
  },
  {
    title: "2. Information We Collect",
    content: (
      <>
        <p>BudgetBee may collect the following categories of information:</p>
        <ul className="privacy-list">
          <li>
            <strong>Account information</strong>, such as name, email address, and login details;
          </li>
          <li>
            <strong>Financial input data</strong>, such as transactions, expenses, income, savings
            goals, budgets, and manually entered categories;
          </li>
          <li>
            <strong>Usage data</strong>, such as interactions with features, page activity, and
            product navigation;
          </li>
          <li>
            <strong>Technical data</strong>, such as browser type, device information, and general
            diagnostic logs.
          </li>
        </ul>
      </>
    ),
  },
  {
    title: "3. How We Use Information",
    content: (
      <>
        <p>We use collected information to support and improve the BudgetBee experience, including to:</p>
        <ul className="privacy-list">
          <li>Provide budgeting, tracking, reporting, and analytics features;</li>
          <li>Maintain account access and user authentication;</li>
          <li>Improve product performance, reliability, and usability;</li>
          <li>Respond to support inquiries and service-related requests;</li>
          <li>Detect misuse, suspicious activity, or security issues.</li>
        </ul>
      </>
    ),
  },
  {
    title: "4. Financial Data Handling",
    content: (
      <>
        <p>
          BudgetBee is designed to help users manage personal finances. Financial data entered into the
          platform is used to generate summaries, charts, calculations, budgeting tools, and
          user-facing insights.
        </p>
        <p>
          BudgetBee does not sell personal financial data. Any future integrations involving connected
          financial accounts, cards, or third-party banking services would be subject to additional
          disclosures, safeguards, and user consent.
        </p>
      </>
    ),
  },
  {
    title: "5. Data Sharing",
    content: (
      <>
        <p>
          We do not sell or rent personal information to third parties. Information may only be shared
          in limited situations, including:
        </p>
        <ul className="privacy-list">
          <li>When required by law, legal process, or regulatory obligation;</li>
          <li>To protect the security, rights, or integrity of BudgetBee and its users;</li>
          <li>
            With trusted service providers that help operate the product, subject to appropriate
            confidentiality and security obligations.
          </li>
        </ul>
      </>
    ),
  },
  {
    title: "6. Data Retention",
    content: (
      <>
        <p>
          We retain information for as long as reasonably necessary to provide the Service, maintain
          security, comply with legal obligations, and support legitimate operational needs.
        </p>
        <p>
          Retention periods may vary depending on account status, product requirements, and applicable
          legal obligations.
        </p>
      </>
    ),
  },
  {
    title: "7. Security Measures",
    content: (
      <>
        <p>
          BudgetBee uses reasonable administrative, technical, and organizational safeguards to help
          protect user information against unauthorized access, misuse, or disclosure.
        </p>
        <p>
          However, no online platform can guarantee absolute security. Users are also responsible for
          safeguarding their passwords, devices, and access credentials.
        </p>
      </>
    ),
  },
  {
    title: "8. User Choices and Rights",
    content: (
      <>
        <p>Depending on location and applicable law, users may have the ability to:</p>
        <ul className="privacy-list">
          <li>Access or review their account information;</li>
          <li>Request correction of inaccurate data;</li>
          <li>Request deletion of certain personal information;</li>
          <li>Manage account preferences and communication settings.</li>
        </ul>
        <p>
          BudgetBee may update available controls over time as the platform develops.
        </p>
      </>
    ),
  },
  {
    title: "9. Cookies and Analytics",
    content: (
      <>
        <p>
          BudgetBee may use cookies, local storage, and similar technologies to improve performance,
          remember user preferences, and better understand product usage.
        </p>
        <p>
          These technologies may support authentication, interface customization, analytics, and
          security monitoring.
        </p>
      </>
    ),
  },
  {
    title: "10. Children’s Privacy",
    content: (
      <>
        <p>
          BudgetBee is not intended for children under the age of 16 without appropriate parental
          consent. We do not knowingly collect personal information from children in violation of
          applicable law.
        </p>
      </>
    ),
  },
  {
    title: "11. Policy Updates",
    content: (
      <>
        <p>
          We may revise this Privacy Policy from time to time to reflect changes in product features,
          legal requirements, or operational practices.
        </p>
        <p>
          When updates are made, the “Last updated” date at the top of this page will be revised.
          Continued use of the Service after changes means the updated Policy will apply.
        </p>
      </>
    ),
  },
  {
    title: "12. Contact",
    content: (
      <>
        <p>
          For questions about this Privacy Policy or BudgetBee’s data practices, please contact{" "}
          <a className="privacy-link" href="mailto:support@budgetbee.com">
            support@budgetbee.com
          </a>
          .
        </p>
      </>
    ),
  },
];

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  return (
    <main className="privacy-page">
      <div className="privacy-shell">
        <div className="privacy-header">
          <span className="privacy-badge">Legal</span>
          <h1 className="privacy-title">Privacy Policy</h1>
          <p className="privacy-subtitle">
            This policy explains what information BudgetBee collects, how it is used, and how we help
            protect user data.
          </p>
          <p className="privacy-date">Last updated: December 2025</p>
        </div>

        <div className="privacy-card">
          {privacySections.map((section) => (
            <section className="privacy-section" key={section.title}>
              <h2 className="privacy-section-title">{section.title}</h2>
              <div className="privacy-section-content">{section.content}</div>
            </section>
          ))}

          <div className="privacy-actions">
            <button
              className="privacy-back-btn"
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

export default PrivacyPolicy;