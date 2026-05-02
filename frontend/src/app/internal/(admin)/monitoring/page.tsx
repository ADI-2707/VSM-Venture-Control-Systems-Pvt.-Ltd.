"use client";

import { useEffect, useState, useRef } from "react";
import styles from "./Monitoring.module.css";
import { useRBACGuard } from "@/hooks/useRBACGuard";
import api from "@/utils/axios";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";

interface LogEntry {
  time: string;
  level: string;
  service: string;
  source: string;
  actor: string;
  message: string;
}

const ERROR_COLORS = ["#10b981", "#ef4444"];

export default function MonitoringPage() {
  const { isAllowed, isLoading } = useRBACGuard();
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [activeTab, setActiveTab] = useState<"site" | "internal">("internal");
  const [isAutoScrollEnabled, setIsAutoScrollEnabled] = useState(true);
  const logsEndRef = useRef<HTMLDivElement>(null);
  const logContainerRef = useRef<HTMLDivElement>(null);
  
  const [latency, setLatency] = useState<any>(null);
  const [errors, setErrors] = useState<any>(null);
  const [security, setSecurity] = useState<any>(null);

  const fetchLogs = async () => {
    try {
      const res = await api.get("/admin/logs");
      setLogs(res.data);
    } catch (error) {
      console.error("Failed to fetch logs:", error);
    }
  };

  const fetchMetrics = async () => {
    try {
      const [lat, err, sec] = await Promise.all([
        api.get("/admin/monitoring/latency"),
        api.get("/admin/monitoring/errors"),
        api.get("/admin/monitoring/security"),
      ]);
      setLatency(lat.data);
      setErrors(err.data);
      setSecurity(sec.data);
    } catch (error) {
      console.error("Failed to fetch metrics", error);
    }
  };

  useEffect(() => {
    if (!isAllowed) return;

    fetchLogs();
    fetchMetrics();
    
    const interval = setInterval(() => {
      fetchLogs();
      fetchMetrics();
    }, 5000);
    return () => clearInterval(interval);
  }, [isAllowed]);

  useEffect(() => {
    if (isAutoScrollEnabled && logsEndRef.current) {
      logsEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [logs, isAutoScrollEnabled]);

  const handleScroll = () => {
    if (logContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = logContainerRef.current
      const atBottom = scrollHeight - scrollTop - clientHeight < 50;
      setIsAutoScrollEnabled(atBottom);
    }
  };

  if (isLoading || !isAllowed) return null;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>System Monitoring</h1>
          <p className={styles.subtitle}>
            Live industry-grade system logs & DevOps metrics
          </p>
        </div>

        <div className={styles.meta}>
          <span className={styles.overallStatus}>Auto-refreshing every 5s</span>
        </div>
      </div>

      <div className={styles.metricsGrid}>
        {/* Latency Card */}
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Latency & Response Time</h2>
          {latency ? (
            <>
              <div className={styles.statRow}>
                <span>Average Response:</span>
                <span className={styles.statVal}>{latency.average}s</span>
              </div>
              <div className={styles.statRow}>
                <span>P95 Latency:</span>
                <span className={styles.statVal}>{latency.p95}s</span>
              </div>
              <div style={{ height: 120, marginTop: 16 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={latency.data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                    <Area type="monotone" dataKey="latency" stroke="#3b82f6" fill="#eff6ff" strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </>
          ) : (
            <p style={{ fontSize: 13, color: "gray" }}>Loading...</p>
          )}
        </div>

        {/* Error Rates Card */}
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Error Rates</h2>
          {errors ? (
            <div style={{ display: "flex", alignItems: "center" }}>
              <div style={{ width: 120, height: 120 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[
                        { name: "Success", value: errors.success },
                        { name: "Error", value: errors.errors }
                      ]}
                      innerRadius={30}
                      outerRadius={50}
                      dataKey="value"
                      stroke="none"
                    >
                      {[0, 1].map((_, index) => (
                        <Cell key={`cell-${index}`} fill={ERROR_COLORS[index % ERROR_COLORS.length]} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div style={{ marginLeft: 16 }}>
                <div className={styles.statRow}>
                  <span style={{ color: "#10b981", fontWeight: "bold" }}>2xx/3xx:</span>
                  <span className={styles.statVal} style={{ marginLeft: 8 }}>{errors.success}</span>
                </div>
                <div className={styles.statRow}>
                  <span style={{ color: "#ef4444", fontWeight: "bold" }}>4xx/5xx:</span>
                  <span className={styles.statVal} style={{ marginLeft: 8 }}>{errors.errors}</span>
                </div>
                <div style={{ marginTop: 8, fontSize: 12, fontWeight: "bold" }}>
                  Rate: {errors.error_rate}%
                </div>
              </div>
            </div>
          ) : (
             <p style={{ fontSize: 13, color: "gray" }}>Loading...</p>
          )}
        </div>

        {/* Security & Access */}
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Security & Access</h2>
          {security ? (
            <>
              <div className={styles.statRow}>
                <span>Failed Logins:</span>
                <span className={styles.statVal} style={{ color: security.failed_logins > 0 ? "#ef4444" : "inherit" }}>
                  {security.failed_logins}
                </span>
              </div>
              <div className={styles.statRow}>
                <span>Unauthorized Attempts:</span>
                <span className={styles.statVal} style={{ color: security.unauthorized > 0 ? "#ef4444" : "inherit" }}>
                  {security.unauthorized}
                </span>
              </div>
              <div style={{ marginTop: 12 }}>
                <h3 style={{ fontSize: 11, color: "gray", marginBottom: 4, textTransform: "uppercase" }}>Recent Events</h3>
                {security.recent_events.length === 0 ? (
                  <p style={{ fontSize: 12 }}>No recent events.</p>
                ) : (
                  <ul style={{ paddingLeft: 16, fontSize: 11 }}>
                    {security.recent_events.slice(-4).map((ev: any, idx: number) => (
                      <li key={idx}>[{ev.time}] {ev.type} ({ev.actor})</li>
                    ))}
                  </ul>
                )}
              </div>
            </>
          ) : (
            <p style={{ fontSize: 13, color: "gray" }}>Loading...</p>
          )}
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
            <button onClick={() => { fetchLogs(); fetchMetrics(); }} style={{ padding: "4px 8px", fontSize: "12px", borderRadius: "6px", border: "1px solid #e4e4e7", background: "white", cursor: "pointer" }}>
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

          <div 
            className={styles.logBody}
            ref={logContainerRef}
            onScroll={handleScroll}
          >
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