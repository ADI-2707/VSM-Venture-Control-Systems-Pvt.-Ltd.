"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { apiRequest } from "@/utils/api";

type User = {
  id: number;
  email: string;
  role: string;
  first_name: string;
  last_name: string | null;
};

type AuthContextType = {
  user: User | null;
  token: string | null;
  loading: boolean;
  authReady: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

function isTokenExpired(token: string): boolean {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.exp * 1000 < Date.now();
  } catch {
    return true;
  }
}

function getStoredAuth(): { user: User | null; token: string | null } {
  if (typeof window === "undefined") return { user: null, token: null };
  try {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    if (token && user) {
      if (isTokenExpired(token)) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        return { user: null, token: null };
      }
      return { token, user: JSON.parse(user) };
    }
  } catch {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }
  return { user: null, token: null };
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    const stored = getStoredAuth();
    setUser(stored.user);
    setToken(stored.token);
    setAuthReady(true);
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    setLoading(true);
    try {
      const res = await apiRequest("/auth/login", "POST", { email, password });

      if (!res.access_token) throw new Error("Invalid response: access_token missing");
      if (!res.user?.id) throw new Error("Invalid user data from backend");

      localStorage.setItem("token", res.access_token);
      localStorage.setItem("user", JSON.stringify(res.user));

      setToken(res.access_token);
      setUser(res.user);
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setToken(null);
  }, []);

  const value = useMemo(
    () => ({ user, token, loading, authReady, login, logout }),
    [user, token, loading, authReady, login, logout]
  );

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}