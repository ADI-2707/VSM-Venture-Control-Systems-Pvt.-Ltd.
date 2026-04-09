"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./Login.module.css";
import { DUMMY_USERS } from "@/internal/constants/dummyUsers";
import { useAuth } from "@/internal/context/AuthContext";

export default function InternalLogin() {
  const router = useRouter();
  const { login, isAuthenticated } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/internal/dashboard");
    }
  }, [isAuthenticated, router]);

  const handleLogin = () => {
    setError("");

    const user = DUMMY_USERS.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      login(user);
      router.push("/internal/dashboard");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h1 className={styles.brand}>VSM Venture Control Systems</h1>

        <div className={styles.card}>
          <h2>Employee Login</h2>

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className={styles.error}>{error}</p>}

          <button onClick={handleLogin}>Login</button>
        </div>
      </div>
    </div>
  );
}