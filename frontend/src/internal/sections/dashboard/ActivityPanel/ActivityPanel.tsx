import styles from "./ActivityPanel.module.css";

const logs = [
  "User uploaded 5 images to Gallery",
  "Admin updated Home banner",
  "New media added to Projects",
  "System health check completed",
];

export default function ActivityPanel() {
  return (
    <div className={styles.panel}>
      <h3 className={styles.title}>Activity Logs</h3>

      <ul className={styles.list}>
        {logs.map((log, i) => (
          <li key={i}>{log}</li>
        ))}
      </ul>
    </div>
  );
}