import mockUsers from "../data/mockUsers.json";
import mockTransactions from "../data/mock_transactions.json";

const usersKey = "users";
const currentUserKey = "currentUser";

function getTransactionsKey() {
  const currentUser = getCurrentUser();
  return currentUser?.email
    ? `transactions_${currentUser.email}`
    : "transactions_guest";
}

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
  localStorage.setItem(currentUserKey, JSON.stringify(user));
}

export function getCurrentUser() {
  const user = localStorage.getItem(currentUserKey);
  return user ? JSON.parse(user) : null;
}

export function clearCurrentUser() {
  localStorage.removeItem(currentUserKey);
}

export function getTransactions() {
  const stored = localStorage.getItem(getTransactionsKey());
  return stored ? JSON.parse(stored) : [];
}

export function saveTransactions(transactions) {
  localStorage.setItem(getTransactionsKey(), JSON.stringify(transactions));
}

export function getAllTransactions() {
  const stored = getTransactions();

  return [...mockTransactions, ...stored].sort((a, b) => {
    const aCreated = Number(a.createdAt) || new Date(a.date).getTime();
    const bCreated = Number(b.createdAt) || new Date(b.date).getTime();

    if (bCreated !== aCreated) {
      return bCreated - aCreated;
    }

    return String(a.id).localeCompare(String(b.id));
  });
}