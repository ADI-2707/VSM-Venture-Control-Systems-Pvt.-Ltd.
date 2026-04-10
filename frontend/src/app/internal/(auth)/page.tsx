"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import styles from "./Login.module.css";
import { DUMMY_USERS } from "@/internal/constants/dummyUsers";
import { useAuth } from "@/internal/context/AuthContext";

export default function InternalLogin() {
  const router = useRouter();
  const { login, isAuthenticated, loading } = useAuth();

  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (!loading && isAuthenticated) {
      router.replace("/internal/dashboard");
    }
  }, [isAuthenticated, loading, router]);

  useEffect(() => {
  const bg = bgRef.current;
  if (!bg) return;

  let frameId: number;

  const handleMouseMove = (e: MouseEvent) => {
    if (frameId) cancelAnimationFrame(frameId);

    frameId = requestAnimationFrame(() => {
      const { innerWidth, innerHeight } = window;

      const x = (e.clientX / innerWidth - 0.5) * 8;
      const y = (e.clientY / innerHeight - 0.5) * 8;

      bg.style.transform = `translate(${x}px, ${y}px)`;
    });
  };

  window.addEventListener("mousemove", handleMouseMove);

  return () => {
    window.removeEventListener("mousemove", handleMouseMove);
    if (frameId) cancelAnimationFrame(frameId);
  };
}, []);

  const handleLogin = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (submitting) return;

    setError("");
    setSubmitting(true);
    setIsActive(true);

    const user = DUMMY_USERS.find(
      (u) => u.username === username && u.password === password
    );

    await new Promise((res) => setTimeout(res, 400));

    if (user) {
      login(user);
      router.replace("/internal/dashboard");
    } else {
      setError("Invalid username or password");
      setIsActive(false);
      setSubmitting(false);
    }
  };

  const handleUsernameEnter = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      passwordRef.current?.focus();
    }
  };

  const handlePasswordEnter = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  if (loading) return null;

  return (
    <div className={styles.wrapper}>
      <div ref={bgRef} className={styles.bgLayer}></div>
      <div className={styles.container}>
        <div className={styles.brand}>
          VSM Venture Control Systems
        </div>

        <form
          className={`${styles.card} ${isActive ? styles.cardActive : ""}`}
          onSubmit={handleLogin}
        >
          <h2 className={styles.title}>Employee Login</h2>

          <div className={styles.field}>
            <label>Username</label>
            <input
              ref={usernameRef}
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyDown={handleUsernameEnter}
              onFocus={() => setIsActive(true)}
              onBlur={() => setIsActive(false)}
              autoFocus
            />
          </div>

          <div className={styles.field}>
            <label>Password</label>
            <input
              ref={passwordRef}
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handlePasswordEnter}
              onFocus={() => setIsActive(true)}
              onBlur={() => setIsActive(false)}
            />
          </div>

          {error && <div className={styles.error}>{error}</div>}

          <button
            type="submit"
            className={styles.loginButton}
            disabled={!username || !password || submitting}
          >
            {submitting ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}