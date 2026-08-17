import { User } from "@/types";

const USERS_KEY = "marketplace-users";

// Получить всех зарегистрированных пользователей
export function getRegisteredUsers(): User[] {
  if (typeof window === "undefined") return [];

  try {
    const stored = localStorage.getItem(USERS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

// Найти пользователя по email
export function findUserByEmail(email: string): User | null {
  const users = getRegisteredUsers();
  return users.find((user) => user.email.toLowerCase() === email.toLowerCase()) ?? null;
}

// Добавить нового пользователя
export function addUser(user: User & { password: string }): void {
  const users = getRegisteredUsers();
  users.push(user);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

// Проверить, существует ли пользователь с таким email
export function isUserExists(email: string): boolean {
  return findUserByEmail(email) !== null;
}

// Проверить пароль пользователя
export function checkPassword(email: string, password: string): boolean {
  const users = getRegisteredUsers();
  const user = users.find(
    (u) => u.email.toLowerCase() === email.toLowerCase()
  );

  if (!user) return false;

  return (user as any).password === password;
}