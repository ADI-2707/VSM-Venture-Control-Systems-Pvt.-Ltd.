"use client";

import styles from "./Topbar.module.css";

export default function Topbar() {
  return (
    <div className={styles.topbar}>
      <div className={styles.inner}>
        <div className={styles.title}>Dashboard</div>

        <div className={styles.actions}>
          <div className={styles.user}>Admin</div>
        </div>
      </div>
    </div>
  );
}