"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./Login.module.css";

export default function InternalLogin() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("auth");
    if (isLoggedIn) {
      router.push("/internal/dashboard");
    }
  }, []);

  const handleLogin = () => {
    if (username === "admin" && password === "admin") {
      localStorage.setItem("auth", "true");
      router.push("/internal/dashboard");
    } else {
      alert("Invalid credentials");
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

          <button onClick={handleLogin}>Login</button>
        </div>
      </div>
    </div>
  );
}