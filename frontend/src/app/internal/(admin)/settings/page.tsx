import styles from "./Settings.module.css";

export default function SettingsPage() {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Settings</h2>

      <div className={styles.section}>
        <h3>Profile</h3>

        <div className={styles.form}>
          <input type="text" placeholder="Name" />
          <input type="email" placeholder="Email" />
          <button>Update Profile</button>
        </div>
      </div>

      <div className={styles.section}>
        <h3>System Configuration</h3>

        <div className={styles.form}>
          <input type="text" placeholder="API Base URL" />
          <input type="text" placeholder="Storage Path" />
          <button>Save Configuration</button>
        </div>
      </div>

      <div className={styles.section}>
        <h3>Security</h3>

        <div className={styles.form}>
          <input type="password" placeholder="New Password" />
          <input type="password" placeholder="Confirm Password" />
          <button>Change Password</button>
        </div>
      </div>
    </div>
  );
}