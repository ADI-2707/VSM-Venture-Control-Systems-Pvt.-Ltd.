"use client";

import styles from "./Settings.module.css";

export default function SettingsPage() {
  return (
    <div className={styles.container}>
      
      <div className={styles.header}>
        <h1 className={styles.title}>Settings</h1>
        <p className={styles.subtitle}>
          Manage your account and system preferences
        </p>
      </div>

      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <h3>Account Security</h3>
          <span>Update your password regularly</span>
        </div>

        <div className={styles.form}>
          <input type="password" placeholder="Current Password" />
          <input type="password" placeholder="New Password" />
          <input type="password" placeholder="Confirm New Password" />

          <button className={styles.primaryBtn}>
            Change Password
          </button>
        </div>
      </div>

      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <h3>Preferences</h3>
          <span>Customize your experience</span>
        </div>

        <div className={styles.placeholder}>
          More settings coming soon...
        </div>
      </div>

    </div>
  );
}