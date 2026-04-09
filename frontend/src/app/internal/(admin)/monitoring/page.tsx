"use client";

import styles from "./Monitoring.module.css";

const services = [
  { name: "Frontend Server", status: "online" },
  { name: "Backend API", status: "online" },
  { name: "Database", status: "online" },
  { name: "Media Storage", status: "warning" },
];

const logs = [
  { text: "System started", type: "info", time: "12:01" },
  { text: "API request success", type: "success", time: "12:05" },
  { text: "Image uploaded", type: "info", time: "12:08" },
  { text: "Storage nearing limit", type: "warning", time: "12:12" },
];

export default function MonitoringPage() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        
        <div>
          <h1 className={styles.title}>System Monitoring</h1>
          <p className={styles.subtitle}>
            Real-time status of services and system health
          </p>
        </div>

        <div className={styles.meta}>
          <span className={styles.uptime}>Uptime: 12h 32m</span>
          <span className={styles.overallStatus}>All systems operational</span>
        </div>
      </div>

      <div className={styles.grid}>
        {services.map((s) => (
          <div key={s.name} className={styles.card}>

            <div className={styles.cardHeader}>
              <span>{s.name}</span>
              <div
                className={`${styles.dot} ${
                  s.status === "online"
                    ? styles.dotOnline
                    : styles.dotWarning
                }`}
              />
            </div>

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

        <div className={styles.logsHeader}>
          <h3>System Logs</h3>
          <span>Live updates</span>
        </div>

        <div className={styles.logsBox}>
          {logs.map((log, i) => (
            <div key={i} className={styles.logRow}>

              <span className={styles.time}>[{log.time}]</span>

              <span
                className={`${styles.logType} ${
                  log.type === "success"
                    ? styles.success
                    : log.type === "warning"
                    ? styles.warning
                    : styles.info
                }`}
              >
                {log.type}
              </span>

              <span className={styles.message}>{log.text}</span>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}