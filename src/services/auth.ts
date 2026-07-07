import { fetchUsers } from "../api/usersApi";
import type { AppUser } from "../types/user";

export function getCurrentUser(): AppUser | null {
  const text = localStorage.getItem("currentUser");
  if (!text) return null;

  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

export function setCurrentUser(user: AppUser) {
  localStorage.setItem("currentUser", JSON.stringify(user));
}

export function logout() {
  localStorage.removeItem("currentUser");
  window.location.href = "/login";
}

export function hasRole(roles: string[]) {
  const user = getCurrentUser();
  return !!user && roles.includes(user.role);
}

export async function login(username: string, password: string): Promise<AppUser> {
  const users = await fetchUsers();

  const inputUsername = String(username).trim();
  const inputPassword = String(password).trim();

  const found = users.find((user) => {
    const userUsername = String(user.username || "").trim();
    const userPassword = String(user.password || "").trim();

    const active =
      user.active === true ||
      String(user.active || "").toUpperCase() === "TRUE";

    return userUsername === inputUsername && userPassword === inputPassword && active;
  });

  if (!found) {
    throw new Error("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง");
  }

  setCurrentUser(found);
  return found;
}