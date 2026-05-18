import {
  ArrowLeft,
  MessageCircleMore,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import "./SupportContactCTA.css";

const SupportContactCTA = () => {
  const navigate = useNavigate();

  return (
    <section className="support-contact-cta">
      <div className="support-contact-content">
        <div className="support-contact-badge">
          <MessageCircleMore
            size={14}
            strokeWidth={2.4}
          />

          <span>
            Need More Support?
          </span>
        </div>

        <p className="support-contact-text">
          If you couldn't find the
          answer you were looking
          for, our team is ready to
          hear from you.
        </p>
      </div>

      <div className="support-contact-actions">
        <button
          type="button"
          className="support-contact-btn"
          onClick={() =>
            navigate("/contact")
          }
        >
          Contact Our Team
        </button>

        <button
          type="button"
          className="support-back-btn"
          onClick={() =>
            navigate("/dashboard")
          }
        >
          <ArrowLeft
            size={16}
            strokeWidth={2.5}
          />

          <span>
            Back
          </span>
        </button>
      </div>
    </section>
  );
};

export default SupportContactCTA;