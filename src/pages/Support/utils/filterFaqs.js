export const filterFaqs = (
  faqItems,
  searchTerm
) => {
  const normalized = searchTerm
    .trim()
    .toLowerCase();

  if (!normalized) {
    return faqItems;
  }

  return faqItems.filter((item) => {
    return (
      item.category
        .toLowerCase()
        .includes(normalized) ||
      item.question
        .toLowerCase()
        .includes(normalized) ||
      item.answer
        .toLowerCase()
        .includes(normalized)
    );
  });
};