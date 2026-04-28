"use client";

import styles from "./Monitoring.module.css";
import { useRBACGuard } from "@/hooks/useRBACGuard";

const services = [
  { name: "Frontend Server", status: "online" },
  { name: "Backend API", status: "online" },
  { name: "Database", status: "online" },
  { name: "Media Storage", status: "warning" },
];

const logs = [
  { time: "12:01", type: "info", service: "system", message: "System started" },
  { time: "12:05", type: "success", service: "api", message: "API request success" },
  { time: "12:08", type: "info", service: "media", message: "Image uploaded" },
  { time: "12:12", type: "warning", service: "storage", message: "Storage nearing limit" },
];

export default function MonitoringPage() {

  const { isAllowed, isLoading } = useRBACGuard();

  if (isLoading || !isAllowed) return null;
  
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
                className={`${styles.dot} ${s.status === "online"
                    ? styles.dotOnline
                    : styles.dotWarning
                  }`}
              />
            </div>

            <div
              className={`${styles.status} ${s.status === "online"
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
          <span>LIVE SYSTEM</span>

          <div className={styles.logControls}>
            <select>
              <option>All Levels</option>
              <option>Info</option>
              <option>Success</option>
              <option>Warning</option>
              <option>Error</option>
            </select>
          </div>
        </div>

        <div className={styles.logsTable}>

          <div className={styles.logHead}>
            <span>Time</span>
            <span>Level</span>
            <span>Service</span>
            <span>Message</span>
          </div>

          <div className={styles.logBody}>
            {logs.map((log, i) => (
              <div key={i} className={styles.logRow}>

                <span className={styles.time}>[{log.time}]</span>

                <span
                  className={`${styles.level} ${log.type === "success"
                      ? styles.success
                      : log.type === "warning"
                        ? styles.warning
                        : styles.info
                    }`}
                >
                  {log.type.toUpperCase()}
                </span>

                <span className={styles.service}>
                  {log.service}
                </span>

                <span className={styles.message}>
                  {log.message}
                </span>

              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}