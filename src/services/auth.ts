// src/lib/auth.ts
import { getRouter } from '@/router';

export interface AuthUser {
  id: string;
  email: string;
  name: string;
}

const STORAGE_KEY = 'auth_user';

export function getStoredUser(): AuthUser | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as AuthUser) : null;
  } catch {
    return null;
  }
}

export const auth = {
  /** Replace with your real API call. Demo: any email + "password". */
  async login(email: string, password: string): Promise<void> {
    if (password !== 'password') throw new Error('Invalid credentials');

    const user: AuthUser = {
      id: crypto.randomUUID(),
      email,
      name: email.split('@')[0],
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    await getRouter().invalidate();
  },

  async logout(): Promise<void> {
    localStorage.removeItem(STORAGE_KEY);
    await getRouter().invalidate();
  },
};
