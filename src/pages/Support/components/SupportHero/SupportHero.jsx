import {
  Search,
  LifeBuoy,
} from "lucide-react";

import "./SupportHero.css";

const SupportHero = ({
  searchTerm,
  setSearchTerm,
}) => {
  return (
    <section className="support-hero">
      <div className="support-badge">
        <LifeBuoy
          size={13}
          strokeWidth={2.4}
        />

        <span>
          BudgetBee Help Center
        </span>
      </div>

      <h1>
        How can we help you today?
      </h1>

      <p>
        BudgetBee helps users track
        spending, manage budgets,
        monitor income, and build
        better financial control.
        Search help topics or explore
        the most common questions
        below.
      </p>

      <div className="support-search-box">
        <Search
          size={18}
          strokeWidth={2.3}
          className="support-search-icon"
        />

        <input
          type="text"
          placeholder="Search for help, budgets, transactions, salary..."
          value={searchTerm}
          onChange={(event) =>
            setSearchTerm(
              event.target.value
            )
          }
        />
      </div>
    </section>
  );
};

export default SupportHero;