"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./Login.module.css";

export default function InternalLogin() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("auth");
    if (isLoggedIn) {
      router.push("/internal/dashboard");
    }
  }, []);

  const handleLogin = () => {
    if (email === "admin@vsm.com" && password === "admin123") {
      localStorage.setItem("auth", "true");
      router.push("/internal/dashboard");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <h2>Employee Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
}