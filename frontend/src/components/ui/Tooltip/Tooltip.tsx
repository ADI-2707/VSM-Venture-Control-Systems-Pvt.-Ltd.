"use client";

import styles from "./Topbar.module.css";
import ThemeToggle from "@/components/ui/ThemeToggle/ThemeToggle";

export default function Topbar() {
  return (
    <div className={styles.topbar}>
      <div className={styles.title}>Dashboard</div>

      <div className={styles.actions}>
        <ThemeToggle />
        <div className={styles.user}>Admin</div>
      </div>
    </div>
  );
}