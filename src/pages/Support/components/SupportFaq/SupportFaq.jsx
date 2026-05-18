import {
  Sparkles,
  SearchX,
} from "lucide-react";

import SupportFaqItem from "../SupportFaqItem/SupportFaqItem";

import "./SupportFaq.css";

const SupportFaq = ({
  groupedFaqs,
  activeQuestion,
  toggleQuestion,
}) => {
  return (
    <section className="support-faq-section">
      <div className="support-section-heading">
        <div className="support-section-badge">
          <Sparkles
            size={14}
            strokeWidth={2.4}
          />

          <span>
            Support Topics
          </span>
        </div>

        <h2>
          Popular Help Topics
        </h2>

        <p>
          Find answers about
          transactions, budgeting,
          income tracking, and
          future finance features.
        </p>
      </div>

      {groupedFaqs.length > 0 ? (
        groupedFaqs.map((group) => (
          <div
            key={group.title}
            className="support-faq-group"
          >
            <div className="support-group-header">
              <h3>
                {group.title}
              </h3>

              <p>
                {group.description}
              </p>
            </div>

            <div className="support-faq-list">
              {group.items.map(
                (item) => (
                  <SupportFaqItem
                    key={item.question}
                    item={item}
                    activeQuestion={
                      activeQuestion
                    }
                    toggleQuestion={
                      toggleQuestion
                    }
                  />
                )
              )}
            </div>
          </div>
        ))
      ) : (
        <div className="support-empty-state">
          <div className="support-empty-icon">
            <SearchX
              size={28}
              strokeWidth={2.2}
            />
          </div>

          <h3>
            No matching help topics
            found
          </h3>

          <p>
            Try another keyword like
            budget, transactions,
            salary, bank, or account.
          </p>
        </div>
      )}
    </section>
  );
};

export default SupportFaq;