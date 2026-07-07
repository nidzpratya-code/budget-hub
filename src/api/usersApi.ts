import type { AppUser } from "../types/user";

const USERS_API_URL =
  "https://script.google.com/macros/s/AKfycbwbLiMgDCSTodPrv6_NLRKQWdb6gOK8LBmqFhLqkrQvP75z_jOCryFbU1--JOzYcYECUQ/exec";

export async function fetchUsers(): Promise<AppUser[]> {
  const response = await fetch(USERS_API_URL);
  return response.json();
}

export async function addUser(user: AppUser) {
  const response = await fetch(USERS_API_URL, {
    method: "POST",
    body: JSON.stringify({
      action: "add",
      user,
    }),
  });

  return response.json();
}

export async function updateUser(username: string, user: AppUser) {
  const response = await fetch(USERS_API_URL, {
    method: "POST",
    body: JSON.stringify({
      action: "update",
      username,
      user,
    }),
  });

  return response.json();
}

export async function deleteUser(username: string) {
  const response = await fetch(USERS_API_URL, {
    method: "POST",
    body: JSON.stringify({
      action: "delete",
      username,
    }),
  });

  return response.json();
}

export async function resetPassword(username: string, password: string) {
  const response = await fetch(USERS_API_URL, {
    method: "POST",
    body: JSON.stringify({
      action: "resetPassword",
      username,
      password,
    }),
  });

  return response.json();
}