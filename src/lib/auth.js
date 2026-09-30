import {
    clearCurrentUser,
    getCurrentUserId,
    getUsers,
    saveUsers,
    setCurrentUserId,
  } from "./storage";
  
  function createId() {
    return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  }
  
  function createAvatar(username) {
    return `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(username)}&backgroundColor=1e293b,312e81,0f766e,7c2d12`;
  }
  
  export function registerUser({ username, email, password }) {
    const users = getUsers();
  
    const normalizedUsername = username.trim();
    const normalizedEmail = email.trim().toLowerCase();
  
    if (!normalizedUsername || !normalizedEmail || !password) {
      throw new Error("Please complete every field.");
    }
  
    if (normalizedUsername.length < 3) {
      throw new Error("Username must be at least 3 characters.");
    }
  
    if (password.length < 6) {
      throw new Error("Password must be at least 6 characters.");
    }
  
    if (
      users.some(
        (user) =>
          user.username.toLowerCase() === normalizedUsername.toLowerCase()
      )
    ) {
      throw new Error("That username is already taken.");
    }
  
    if (users.some((user) => user.email === normalizedEmail)) {
      throw new Error("An account with that email already exists.");
    }
  
    const user = {
      id: createId(),
      username: normalizedUsername,
      email: normalizedEmail,
      password,
      avatar: createAvatar(normalizedUsername),
      rating: 1200,
      highestRating: 1200,
      gamesPlayed: 0,
      wins: 0,
      losses: 0,
      draws: 0,
      currentStreak: 0,
      bestStreak: 0,
      joinedAt: new Date().toISOString(),
    };
  
    users.push(user);
    saveUsers(users);
    setCurrentUserId(user.id);
  
    return user;
  }
  
  export function loginUser({ identifier, password }) {
    const users = getUsers();
  
    const value = identifier.trim().toLowerCase();
  
    const user = users.find(
      (candidate) =>
        candidate.email.toLowerCase() === value ||
        candidate.username.toLowerCase() === value
    );
  
    if (!user || user.password !== password) {
      throw new Error("Incorrect username/email or password.");
    }
  
    setCurrentUserId(user.id);
  
    return user;
  }
  
  export function logoutUser() {
    clearCurrentUser();
  }
  
  export function getAuthenticatedUser() {
    const userId = getCurrentUserId();
  
    if (!userId) {
      return null;
    }
  
    const users = getUsers();
  
    return users.find((user) => user.id === userId) || null;
  }