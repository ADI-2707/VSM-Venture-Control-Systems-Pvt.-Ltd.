import styles from "./Monitoring.module.css";

const services = [
  { name: "Frontend Server", status: "online" },
  { name: "Backend API", status: "online" },
  { name: "Database", status: "online" },
  { name: "Media Storage", status: "warning" },
];

const logs = [
  "[12:01] System started",
  "[12:05] API request success",
  "[12:08] Image uploaded",
  "[12:12] Warning: Storage nearing limit",
];

export default function MonitoringPage() {
  return (
    <div className={styles.container}>
      {/* HEADER */}
      <div className={styles.header}>
        <h2>System Monitoring</h2>
        <span className={styles.uptime}>Uptime: 12h 32m</span>
      </div>

      <div className={styles.grid}>
        {services.map((s) => (
          <div key={s.name} className={styles.card}>
            <span>{s.name}</span>

            <div
              className={`${styles.status} ${
                s.status === "online"
                  ? styles.online
                  : styles.warning
              }`}
            >
              {s.status}
            </div>
          </div>
        ))}
      </div>

      <div className={styles.logs}>
        <div className={styles.logsTitle}>System Logs</div>

        <div className={styles.logsBox}>
          {logs.map((log, i) => (
            <div key={i} className={styles.log}>
              {log}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}