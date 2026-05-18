import { useMemo, useState } from "react";

import "./Support.css";

import SupportHero from "./components/SupportHero/SupportHero";
import SupportCategories from "./components/SupportCategories/SupportCategories";
import SupportFaq from "./components/SupportFaq/SupportFaq";
import SupportContactCTA from "./components/SupportContactCTA/SupportContactCTA";

import {
  supportCategories,
  faqItems,
} from "./data/supportData";

import { filterFaqs } from "./utils/filterFaqs";

const Support = () => {
  const [searchTerm, setSearchTerm] =
    useState("");

  const [activeQuestion, setActiveQuestion] =
    useState(null);

  const filteredFaqs = useMemo(() => {
    return filterFaqs(
      faqItems,
      searchTerm
    );
  }, [searchTerm]);

  const groupedFaqs = useMemo(() => {
    return supportCategories
      .map((category) => ({
        ...category,
        items: filteredFaqs.filter(
          (faq) =>
            faq.category === category.title
        ),
      }))
      .filter(
        (group) => group.items.length > 0
      );
  }, [filteredFaqs]);

  const toggleQuestion = (question) => {
    setActiveQuestion((prev) =>
      prev === question ? null : question
    );
  };

  return (
    <div className="support-page">
      <div className="support-wrapper">
        <SupportHero
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />

        <SupportCategories
          categories={supportCategories}
        />

        <SupportFaq
          groupedFaqs={groupedFaqs}
          activeQuestion={activeQuestion}
          toggleQuestion={toggleQuestion}
        />

        <SupportContactCTA />
      </div>
    </div>
  );
};

export default Support;