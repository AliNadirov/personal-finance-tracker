import mockUsers from "../data/mockUsers.json";
import mockTransactions from "../data/mock_transactions.json";
import mockMainIncomeSources from "../data/mockMainIncomeSources.json";
import mockAdditionalIncome from "../data/mockAdditionalIncome.json";

const usersKey = "users";
const currentUserKey = "currentUser";
const transactionsKey = "transactions";
const budgetPlanKey = "budgetPlan";

function getUserIncomeDefaults(userId = "default") {
  const mainIncomeSources = mockMainIncomeSources.filter(
    (income) => income.userId === userId
  );

  const additionalIncome = mockAdditionalIncome.filter(
    (income) => income.userId === userId
  );

  const defaultMainIncomeSources = mockMainIncomeSources.filter(
    (income) => income.userId === "default"
  );

  const defaultAdditionalIncome = mockAdditionalIncome.filter(
    (income) => income.userId === "default"
  );

  return {
    mainIncomeSources:
      mainIncomeSources.length > 0 ? mainIncomeSources : defaultMainIncomeSources,
    additionalIncome:
      additionalIncome.length > 0 ? additionalIncome : defaultAdditionalIncome,
  };
}

function calculateMonthlyIncome(mainIncomeSources = [], additionalIncome = []) {
  return [...mainIncomeSources, ...additionalIncome].reduce(
    (total, income) => total + Number(income.monthlyIncome || 0),
    0
  );
}

function calculateRecommendedMonthlyBudget(mainIncomeSources = [], additionalIncome = []) {
  const monthlyIncome = calculateMonthlyIncome(mainIncomeSources, additionalIncome);
  return Math.round(monthlyIncome * 0.7);
}

function normalizeUser(user = {}) {
  const userId = user.id || "default";
  const incomeDefaults = getUserIncomeDefaults(userId);

  const cleanMainIncomeSources = Array.isArray(user.mainIncomeSources)
    ? user.mainIncomeSources.filter((income) => income.userId === userId)
    : [];

  const cleanAdditionalIncome = Array.isArray(user.additionalIncome)
    ? user.additionalIncome.filter((income) => income.userId === userId)
    : [];

  const mainIncomeSources =
    cleanMainIncomeSources.length > 0
      ? cleanMainIncomeSources
      : incomeDefaults.mainIncomeSources;

  const additionalIncome =
    cleanAdditionalIncome.length > 0
      ? cleanAdditionalIncome
      : incomeDefaults.additionalIncome;

  const recommendedBudget = calculateRecommendedMonthlyBudget(
    mainIncomeSources,
    additionalIncome
  );

  return {
    name: user.name || user.displayName || "",
    email: user.email || "",
    currency: user.currency || "USD",
    ...user,
    id: userId,
    mainIncomeSources,
    additionalIncome,
    monthlyBudget: Number(user.monthlyBudget || recommendedBudget),
  };
}

export async function getUsers() {
  const storedUsers = localStorage.getItem(usersKey);

  if (storedUsers) {
    return JSON.parse(storedUsers).map((user) => normalizeUser(user));
  }

  return mockUsers.map((user) => normalizeUser(user));
}

export function saveUsers(users) {
  localStorage.setItem(usersKey, JSON.stringify(users));
}

export async function addUser(newUser) {
  const users = await getUsers();
  const normalizedEmail = String(newUser.email || "").trim().toLowerCase();

  const exists = users.find(
    (user) => String(user.email || "").trim().toLowerCase() === normalizedEmail
  );

  if (!exists) {
    const userWithDefaults = normalizeUser({
      ...newUser,
      id: newUser.id || `user-${Date.now()}`,
      email: normalizedEmail,
      currency: newUser.currency || "USD",
    });

    users.push(userWithDefaults);
    saveUsers(users);
    return userWithDefaults;
  }

  return null;
}

export async function findUserByEmail(email) {
  const users = await getUsers();
  const normalizedEmail = String(email || "").trim().toLowerCase();

  return (
    users.find(
      (user) => String(user.email || "").trim().toLowerCase() === normalizedEmail
    ) || null
  );
}

export function setCurrentUser(user) {
  const normalizedUser = normalizeUser(user);
  localStorage.setItem(currentUserKey, JSON.stringify(normalizedUser));
}

export function getCurrentUser() {
  const storedUser = localStorage.getItem(currentUserKey);

  if (storedUser) {
    return normalizeUser(JSON.parse(storedUser));
  }

  return normalizeUser({
    id: "default",
    name: "Demo User",
    email: "demo@budgetbee.com",
    currency: "USD",
  });
}

export function clearCurrentUser() {
  localStorage.removeItem(currentUserKey);
}

export function getTransactions() {
  const stored = localStorage.getItem(transactionsKey);

  if (stored) {
    return JSON.parse(stored);
  }

  return [];
}

export function saveTransactions(transactions) {
  localStorage.setItem(transactionsKey, JSON.stringify(transactions));
}

export function getAllTransactions() {
  const stored = getTransactions();

  return [...mockTransactions, ...stored].sort((a, b) => {
    const aCreated = Number(a.createdAt) || new Date(a.date).getTime();
    const bCreated = Number(b.createdAt) || new Date(b.date).getTime();

    if (bCreated !== aCreated) {
      return bCreated - aCreated;
    }

    return String(b.id).localeCompare(String(a.id));
  });
}

export function getBudgetPlan() {
  const stored = localStorage.getItem(budgetPlanKey);

  if (stored) {
    return JSON.parse(stored);
  }

  return null;
}

export function saveBudgetPlan(plan) {
  localStorage.setItem(budgetPlanKey, JSON.stringify(plan));
}