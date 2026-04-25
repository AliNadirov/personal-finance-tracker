import mockUsers from "../data/mockUsers.json";
import mockTransactions from "../data/mock_transactions.json";

const usersKey = "users";
const currentUserKey = "currentUser";
const transactionsKey = "transactions";
const budgetPlanKey = "budgetPlan";

export async function getUsers() {
  const storedUsers = localStorage.getItem(usersKey);
  if (storedUsers) {
    return JSON.parse(storedUsers);
  }
  return mockUsers;
}

export function saveUsers(users) {
  localStorage.setItem(usersKey, JSON.stringify(users));
}

export async function addUser(newUser) {
  const users = await getUsers();
  const exists = users.find((user) => user.email === newUser.email);
  if (!exists) {
    users.push(newUser);
    saveUsers(users);
    return newUser;
  }
  return null;
}

export async function findUserByEmail(email) {
  const users = await getUsers();
  return users.find((user) => user.email === email) || null;
}

export function setCurrentUser(user) {
  const normalizedUser = {
    name: user.name || user.displayName || "",
    email: user.email || "",
    ...user,
  };
  localStorage.setItem(currentUserKey, JSON.stringify(normalizedUser));
}

export function getCurrentUser() {
  const user = localStorage.getItem(currentUserKey);
  if (user) {
    return JSON.parse(user);
  }
  return null;
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