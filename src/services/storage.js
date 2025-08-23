import mockUsers from "../data/mockUsers.json";

const usersKey = "users";
const currentUserKey = "currentUser";

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
  if (user) {
    return JSON.parse(user);
  }
  return null;
}

export function clearCurrentUser() {
  localStorage.removeItem(currentUserKey);
}