"use client";

import { useEffect, useState, useRef } from "react";
import styles from "./Monitoring.module.css";
import { useRBACGuard } from "@/hooks/useRBACGuard";

interface LogEntry {
  time: string;
  level: string;
  service: string;
  message: string;
}

export default function MonitoringPage() {
  const { isAllowed, isLoading } = useRBACGuard();
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const logsEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isAllowed) return;

    const wsUrl = "ws://localhost:8000/admin/ws/logs";
    const ws = new WebSocket(wsUrl);

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        setLogs((prev) => {
          const newLogs = [...prev, data];
          return newLogs.length > 500 ? newLogs.slice(newLogs.length - 500) : newLogs;
        });
      } catch (err) {
        const now = new Date();
        setLogs((prev) => {
          const newLogs = [
            ...prev,
            {
              time: `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`,
              level: "INFO",
              service: "system",
              message: event.data,
            },
          ];
          return newLogs.length > 500 ? newLogs.slice(newLogs.length - 500) : newLogs;
        });
      }
    };

    ws.onerror = (error) => {
      console.error("WebSocket Error:", error);
    };

    return () => {
      ws.close();
    };
  }, [isAllowed]);

  useEffect(() => {
    if (logsEndRef.current) {
      logsEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [logs]);

  if (isLoading || !isAllowed) return null;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>System Monitoring</h1>
          <p className={styles.subtitle}>
            Live industry-grade system logs
          </p>
        </div>

        <div className={styles.meta}>
          <span className={styles.overallStatus}>WebSocket Connected</span>
        </div>
      </div>

      <div className={styles.logs}>
        <div className={styles.logsHeader}>
          <h3>System Logs</h3>
          <span>LIVE SYSTEM</span>
        </div>

        <div className={styles.logsTable}>
          <div className={styles.logHead}>
            <span>Time</span>
            <span>Level</span>
            <span>Service</span>
            <span>Message</span>
          </div>

          <div className={styles.logBody}>
            {logs.length === 0 ? (
              <div style={{ padding: "12px", fontSize: "12px", color: "gray" }}>Waiting for logs...</div>
            ) : (
              logs.map((log, i) => (
                <div key={i} className={styles.logRow}>
                  <span className={styles.time}>[{log.time}]</span>
                  <span
                    className={`${styles.level} ${
                      log.level === "INFO"
                        ? styles.info
                        : log.level === "WARNING"
                        ? styles.warning
                        : log.level === "ERROR"
                        ? styles.error
                        : styles.success
                    }`}
                  >
                    {log.level}
                  </span>
                  <span className={styles.service}>{log.service}</span>
                  <span className={styles.message}>{log.message}</span>
                </div>
              ))
            )}
            <div ref={logsEndRef} />
          </div>
        </div>
      </div>
    </div>
  );
}