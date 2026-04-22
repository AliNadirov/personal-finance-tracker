import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Support.css";

const supportCategories = [
  {
    title: "Transactions",
    description: "Learn how to add, review, and manage daily spending.",
  },
  {
    title: "Budgets",
    description: "Understand monthly limits, category planning, and remaining balance.",
  },
  {
    title: "Income Tracking",
    description: "Track salary, side income, and other money coming in.",
  },
  {
    title: "Bank Sync",
    description: "Explore upcoming card and bank connection features.",
  },
  {
    title: "Account Help",
    description: "Find answers about profile, dashboard usage, and support.",
  },
];

const faqItems = [
  {
    category: "Transactions",
    question: "How do I add a new transaction?",
    answer:
      "You can add a new transaction from the transaction section of your dashboard. Enter the amount, category, date, and details to keep your spending records updated.",
  },
  {
    category: "Transactions",
    question: "Can I edit or remove old transactions?",
    answer:
      "Yes. BudgetBee is designed to let you review and manage past records so your spending history stays accurate and fully under your control.",
  },
  {
    category: "Transactions",
    question: "Why is my spending summary not matching my recent activity?",
    answer:
      "This can happen when a transaction was entered with the wrong category, amount, or date. Review your latest records to make sure everything is saved correctly.",
  },
  {
    category: "Budgets",
    question: "How do I set my monthly budget?",
    answer:
      "You can define a monthly budget to compare your spending against your personal financial goal. This helps BudgetBee calculate how much you have spent and how much is left.",
  },
  {
    category: "Budgets",
    question: "Can I manage budget by category?",
    answer:
      "BudgetBee is built around better spending visibility, and category-based planning can help users control essentials, lifestyle, travel, education, and more.",
  },
  {
    category: "Budgets",
    question: "Why does my remaining budget look incorrect?",
    answer:
      "Your remaining budget depends on your saved budget amount and all recorded expenses. Check for duplicate entries, incorrect amounts, or missing income details.",
  },
  {
    category: "Income Tracking",
    question: "Can I add salary and other income sources?",
    answer:
      "Yes. BudgetBee is designed to support income tracking so users can follow salary, side income, and other sources together with spending activity.",
  },
  {
    category: "Income Tracking",
    question: "Can I track more than one source of income?",
    answer:
      "Yes. A strong finance tracker should support multiple income streams, helping users understand their total monthly cash flow more clearly.",
  },
  {
    category: "Income Tracking",
    question: "How does income tracking help with budgeting?",
    answer:
      "When income and expenses are tracked together, users can create more realistic budgets, monitor financial habits, and stay in better control of overall balance.",
  },
  {
    category: "Bank Sync",
    question: "Will BudgetBee support bank or card syncing in the future?",
    answer:
      "Yes. Bank and card connection features are planned as a future improvement so users can follow real spending activity more automatically and with less manual input.",
  },
  {
    category: "Bank Sync",
    question: "Will my financial data be secure?",
    answer:
      "Security is a key part of any finance product. Future sync and account features should be built with secure authentication, protected user data, and privacy-first handling.",
  },
  {
    category: "Bank Sync",
    question: "Will synced transactions update automatically?",
    answer:
      "That is the long-term goal. Future backend support can allow BudgetBee to fetch and reflect spending updates more efficiently after secure bank or card connection is added.",
  },
  {
    category: "Account Help",
    question: "How do I use the dashboard more effectively?",
    answer:
      "Use your dashboard to review spending trends, monitor budget progress, and keep an eye on both expenses and income in one place.",
  },
  {
    category: "Account Help",
    question: "Can I reset or reorganize my finance data later?",
    answer:
      "A full finance tracker should give users flexible control over their records, helping them edit, reorganize, or rebuild financial data when needed.",
  },
  {
    category: "Account Help",
    question: "How can I contact the BudgetBee team?",
    answer:
      "If you still need help after checking the support topics, you can go to the Contact page and send a direct message to the BudgetBee team.",
  },
];

const Support = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeQuestion, setActiveQuestion] = useState(null);
  const navigate = useNavigate();

  const filteredFaqs = useMemo(() => {
    const normalized = searchTerm.trim().toLowerCase();

    if (!normalized) return faqItems;

    return faqItems.filter((item) => {
      return (
        item.category.toLowerCase().includes(normalized) ||
        item.question.toLowerCase().includes(normalized) ||
        item.answer.toLowerCase().includes(normalized)
      );
    });
  }, [searchTerm]);

  const groupedFaqs = useMemo(() => {
    return supportCategories
      .map((category) => ({
        ...category,
        items: filteredFaqs.filter((faq) => faq.category === category.title),
      }))
      .filter((group) => group.items.length > 0);
  }, [filteredFaqs]);

  const toggleQuestion = (question) => {
    setActiveQuestion((prev) => (prev === question ? null : question));
  };

  return (
    <div className="support-page">
      <div className="support-wrapper">
        <section className="support-hero">
          <span className="support-badge">BudgetBee Help Center</span>
          <h1>How can we help you today?</h1>
          <p>
            BudgetBee helps users track spending, manage budgets, monitor
            income, and build better financial control. Search help topics or
            explore the most common questions below.
          </p>

          <div className="support-search-box">
            <input
              type="text"
              placeholder="Search for help, budgets, transactions, salary..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
          </div>
        </section>

        <section className="support-categories">
          {supportCategories.map((category) => (
            <div key={category.title} className="support-category-card">
              <h3>{category.title}</h3>
              <p>{category.description}</p>
            </div>
          ))}
        </section>

        <section className="support-faq-section">
          <div className="support-section-heading">
            <h2>Popular Help Topics</h2>
            <p>
              Find answers about transactions, budgeting, income tracking, and
              future finance features.
            </p>
          </div>

          {groupedFaqs.length > 0 ? (
            groupedFaqs.map((group) => (
              <div key={group.title} className="support-faq-group">
                <div className="support-group-header">
                  <h3>{group.title}</h3>
                  <p>{group.description}</p>
                </div>

                <div className="support-faq-list">
                  {group.items.map((item) => {
                    const isOpen = activeQuestion === item.question;

                    return (
                      <div
                        key={item.question}
                        className={`support-faq-item ${isOpen ? "open" : ""}`}
                      >
                        <button
                          className="support-faq-question"
                          onClick={() => toggleQuestion(item.question)}
                          type="button"
                        >
                          <span>{item.question}</span>
                          <span className="support-faq-icon">
                            {isOpen ? "−" : "+"}
                          </span>
                        </button>

                        {isOpen && (
                          <div className="support-faq-answer">
                            <p>{item.answer}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))
          ) : (
            <div className="support-empty-state">
              <h3>No matching help topics found</h3>
              <p>
                Try another keyword like budget, transactions, salary, bank, or
                account.
              </p>
            </div>
          )}
        </section>

        <section className="support-contact-cta">
          <div className="support-contact-content">
            <h2>Still need help?</h2>
            <p>
              If you couldn’t find the answer you were looking for, our team is
              ready to hear from you.
            </p>
          </div>

          <div className="support-contact-actions">
            <button
              type="button"
              className="support-contact-btn"
              onClick={() => navigate("/contact")}
            >
              Contact Our Team
            </button>

            <button
              type="button"
              className="support-back-btn"
              onClick={() => navigate("/dashboard")}
            >
              ← Back to Dashboard
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Support;