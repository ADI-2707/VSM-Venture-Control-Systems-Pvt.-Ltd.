"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import styles from "./Login.module.css";
import { useAuth } from "@/context/AuthContext";

export default function InternalLogin() {
  const router = useRouter();
  const { login, user, authReady } = useAuth();

  const bgRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!mounted || !authReady) return;
    if (user) router.replace("/internal/dashboard");
  }, [user, authReady, mounted, router]);

  useEffect(() => {
    const bg = bgRef.current;
    if (!bg) return;
    let frameId: number;
    const handleMouseMove = (e: MouseEvent) => {
      if (frameId) cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(() => {
        const x = (e.clientX / window.innerWidth - 0.5) * 8;
        const y = (e.clientY / window.innerHeight - 0.5) * 8;
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
    try {
      await login(email, password);
    } catch (err: any) {
      setError(err?.response?.data?.detail || "Login failed");
      setSubmitting(false);
      setIsActive(false);
    }
  };

  if (!mounted) return <div style={{ visibility: "hidden" }} />;
  if (user) return null;

  return (
    <div className={styles.wrapper}>
      <div ref={bgRef} className={styles.bgLayer}></div>
      <div className={styles.container}>
        <div className={styles.brand}>VSM Venture Control Systems</div>
        <form
          className={`${styles.card} ${isActive ? styles.cardActive : ""}`}
          onSubmit={handleLogin}
        >
          <h2 className={styles.title}>Employee Login</h2>
          <div className={styles.field}>
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoFocus
            />
          </div>
          <div className={styles.field}>
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <div className={styles.error}>{error}</div>}
          <button
            type="submit"
            className={styles.loginButton}
            disabled={!email || !password || submitting}
          >
            {submitting ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}