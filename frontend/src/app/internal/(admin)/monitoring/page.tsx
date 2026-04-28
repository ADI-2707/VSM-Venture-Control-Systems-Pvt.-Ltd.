"use client";

import { useEffect, useState, useRef } from "react";
import styles from "./Monitoring.module.css";
import { useRBACGuard } from "@/hooks/useRBACGuard";
import api from "@/utils/axios";

interface LogEntry {
  time: string;
  level: string;
  service: string;
  source: string;
  actor: string;
  message: string;
}

export default function MonitoringPage() {
  const { isAllowed, isLoading } = useRBACGuard();
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [activeTab, setActiveTab] = useState<"site" | "internal">("internal");
  const logsEndRef = useRef<HTMLDivElement>(null);

  const fetchLogs = async () => {
    try {
      const res = await api.get("/admin/logs");
      setLogs(res.data);
    } catch (error) {
      console.error("Failed to fetch logs:", error);
    }
  };

  useEffect(() => {
    if (!isAllowed) return;

    fetchLogs();
    
    const interval = setInterval(fetchLogs, 5000); // refresh every 5 seconds
    return () => clearInterval(interval);
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
          <span className={styles.overallStatus}>Auto-refreshing every 5s</span>
        </div>
      </div>

      <div className={styles.logs}>
        <div className={styles.tabsContainer}>
          <button 
            className={`${styles.tab} ${activeTab === "site" ? styles.activeTab : ""}`}
            onClick={() => setActiveTab("site")}
          >
            Site Logs
          </button>
          <button 
            className={`${styles.tab} ${activeTab === "internal" ? styles.activeTab : ""}`}
            onClick={() => setActiveTab("internal")}
          >
            Internal Logs
          </button>
        </div>

        <div className={styles.logsHeader}>
          <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
            <h3>System Logs</h3>
            <button onClick={fetchLogs} style={{ padding: "4px 8px", fontSize: "12px", borderRadius: "6px", border: "1px solid #e4e4e7", background: "white", cursor: "pointer" }}>
              Refresh Now
            </button>
          </div>
          <span>LIVE SYSTEM</span>
        </div>

        <div className={styles.logsTable}>
          <div className={styles.logHead}>
            <span>Time</span>
            <span>Level</span>
            <span>Service</span>
            <span>Actor</span>
            <span>Message</span>
          </div>

          <div className={styles.logBody}>
            {logs.filter(l => l.source === activeTab).length === 0 ? (
              <div style={{ padding: "12px", fontSize: "12px", color: "gray" }}>Waiting for {activeTab} logs...</div>
            ) : (
              logs.filter(l => l.source === activeTab).map((log, i) => (
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
                  <span className={styles.actor}>{log.actor || "-"}</span>
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