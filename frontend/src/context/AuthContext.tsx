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
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

function getStoredAuth(): { user: User | null; token: string | null } {
  if (typeof window === "undefined") return { user: null, token: null };
  try {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    if (token && user) {
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
  const stored = getStoredAuth();

  const [user, setUser] = useState<User | null>(stored.user);
  const [token, setToken] = useState<string | null>(stored.token);
  const [loading, setLoading] = useState(false);

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
    () => ({ user, token, loading, login, logout }),
    [user, token, loading, login, logout]
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