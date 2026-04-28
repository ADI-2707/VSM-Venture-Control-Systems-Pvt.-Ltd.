"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import api from "@/utils/axios";

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

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    const initAuth = async () => {
      const storedToken = localStorage.getItem("token");

      if (!storedToken) {
        setAuthReady(true);
        return;
      }

      try {
        const res = await api.get("/auth/profile");

        setUser(res.data);
        setToken(storedToken);
      } catch {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
        setToken(null);
      } finally {
        setAuthReady(true);
      }
    };

    initAuth();
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    setLoading(true);

    try {
      const res = await api.post("/auth/login", { email, password });

      if (!res.data.access_token) {
        throw new Error("Invalid response: access_token missing");
      }

      localStorage.setItem("token", res.data.access_token);

      const profile = await api.get("/auth/profile");

      setToken(res.data.access_token);
      setUser(profile.data);

      localStorage.setItem("user", JSON.stringify(profile.data));
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setToken(null);

    window.location.href = "/internal";
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