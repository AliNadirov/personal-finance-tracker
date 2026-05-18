import {
  ChevronDown,
  ChevronUp,
} from "lucide-react";

import "./SupportFaqItem.css";

const SupportFaqItem = ({
  item,
  activeQuestion,
  toggleQuestion,
}) => {
  const isOpen =
    activeQuestion === item.question;

  return (
    <div
      className={`support-faq-item ${
        isOpen ? "open" : ""
      }`}
    >
      <button
        type="button"
        className="support-faq-question"
        onClick={() =>
          toggleQuestion(
            item.question
          )
        }
      >
        <span>
          {item.question}
        </span>

        <span className="support-faq-icon">
          {isOpen ? (
            <ChevronUp
              size={18}
              strokeWidth={2.5}
            />
          ) : (
            <ChevronDown
              size={18}
              strokeWidth={2.5}
            />
          )}
        </span>
      </button>

      <div
        className={`support-faq-answer-wrapper ${
          isOpen ? "open" : ""
        }`}
      >
        <div className="support-faq-answer">
          <p>
            {item.answer}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SupportFaqItem;