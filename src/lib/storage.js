const USERS_KEY = "chessforge_users";
const CURRENT_USER_KEY = "chessforge_current_user";
const GAMES_KEY = "chessforge_games";

export function getUsers() {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
  } catch {
    return [];
  }
}

export function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function getCurrentUserId() {
  return localStorage.getItem(CURRENT_USER_KEY);
}

export function setCurrentUserId(id) {
  localStorage.setItem(CURRENT_USER_KEY, id);
}

export function clearCurrentUser() {
  localStorage.removeItem(CURRENT_USER_KEY);
}

export function getGames() {
  try {
    return JSON.parse(localStorage.getItem(GAMES_KEY)) || [];
  } catch {
    return [];
  }
}

export function saveGames(games) {
  localStorage.setItem(GAMES_KEY, JSON.stringify(games));
}

export function updateUser(userId, updates) {
  const users = getUsers();
  const index = users.findIndex((user) => user.id === userId);

  if (index === -1) {
    return null;
  }

  users[index] = {
    ...users[index],
    ...updates,
  };

  saveUsers(users);

  return users[index];
}