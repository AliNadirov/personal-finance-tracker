import {
  Receipt,
  WalletCards,
  Landmark,
  ShieldCheck,
  UserRoundCog,
} from "lucide-react";

import "./SupportCategories.css";

const categoryIcons = {
  Transactions: Receipt,
  Budgets: WalletCards,
  "Income Tracking": Landmark,
  "Bank Sync": ShieldCheck,
  "Account Help": UserRoundCog,
};

const SupportCategories = ({
  categories,
}) => {
  return (
    <section className="support-categories">
      {categories.map((category) => {
        const Icon =
          categoryIcons[
            category.title
          ];

        return (
          <div
            key={category.title}
            className="support-category-card"
          >
            <div className="support-category-icon">
              <Icon
                size={20}
                strokeWidth={2.3}
              />
            </div>

            <h3>
              {category.title}
            </h3>

            <p>
              {category.description}
            </p>
          </div>
        );
      })}
    </section>
  );
};

export default SupportCategories;