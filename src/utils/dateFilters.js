export function isPastOrToday(dateValue) {
  const today = new Date();
  today.setHours(23, 59, 59, 999);

  const date = new Date(`${dateValue}T00:00:00`);

  return date <= today;
}

export function isCurrentMonthToDate(dateValue) {
  const today = new Date();
  const date = new Date(`${dateValue}T00:00:00`);

  return (
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    isPastOrToday(dateValue)
  );
}