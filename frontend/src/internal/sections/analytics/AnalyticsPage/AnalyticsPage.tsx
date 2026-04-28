"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { API_BASE_URL } from "@/utils/axios";
import styles from "./AnalyticsPage.module.css";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type Summary = {
  total_jobs: number;
  total_applications: number;
  recent_applications: number;
  jobs_by_status: { status: string; count: number }[];
};

type TrendPoint = { date: string; count: number };
type TopJob = {
  job_id: number;
  title: string;
  department: string;
  application_count: number;
};

const STATUS_COLORS: Record<string, string> = {
  active: "#10b981",
  draft: "#f59e0b",
  closed: "#94a3b8",
};

const DAYS_OPTIONS = [
  { label: "Last 7 days", value: 7 },
  { label: "Last 30 days", value: 30 },
  { label: "Last 90 days", value: 90 },
];

export default function AnalyticsPage() {
  const { token, authReady, logout } = useAuth();

  const [days, setDays] = useState(30);
  const [summary, setSummary] = useState<Summary | null>(null);
  const [trend, setTrend] = useState<TrendPoint[]>([]);
  const [topJobs, setTopJobs] = useState<TopJob[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const apiFetch = async (url: string) => {
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.status === 401) { logout(); throw new Error("Unauthorized"); }
    if (!res.ok) throw new Error("Request failed");
    return res.json();
  };

  useEffect(() => {
    if (!authReady || !token) return;

    setLoading(true);
    setError("");

    Promise.all([
      apiFetch(`${API_BASE_URL}/admin/analytics/summary`),
      apiFetch(`${API_BASE_URL}/admin/analytics/trend?days=${days}`),
      apiFetch(`${API_BASE_URL}/admin/analytics/top-jobs?limit=5`),
    ])
      .then(([summaryData, trendData, topJobsData]) => {
        setSummary(summaryData);
        setTrend(trendData.trend);
        setTopJobs(topJobsData.top_jobs);
      })
      .catch((err) => {
        if (err.message !== "Unauthorized") setError("Failed to load analytics");
      })
      .finally(() => setLoading(false));
  }, [authReady, token, days]);

  const maxApplications = Math.max(...topJobs.map((j) => j.application_count), 1);

  // Format date for chart: "Apr 27"
  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
  };

  return (
    <div className={styles.container}>

      {/* Header */}
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Analytics</h1>
          <p className={styles.subtitle}>
            Track performance, engagement and recruitment trends
          </p>
        </div>
        <select
          className={styles.rangeSelect}
          value={days}
          onChange={(e) => setDays(Number(e.target.value))}
        >
          {DAYS_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      </div>

      {error && <p className={styles.error}>{error}</p>}
      {loading && <p className={styles.state}>Loading analytics...</p>}

      {!loading && summary && (
        <>
          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <span className={styles.statLabel}>Total Jobs</span>
              <span className={styles.statValue}>{summary.total_jobs}</span>
              <span className={styles.statSub}>across all statuses</span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statLabel}>Total Applications</span>
              <span className={styles.statValue}>{summary.total_applications}</span>
              <span className={styles.statSub}>all time</span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statLabel}>Recent Applications</span>
              <span className={styles.statValue}>{summary.recent_applications}</span>
              <span className={styles.statSub}>in the last 7 days</span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statLabel}>Avg. per Job</span>
              <span className={styles.statValue}>
                {summary.total_jobs > 0
                  ? (summary.total_applications / summary.total_jobs).toFixed(1)
                  : "—"}
              </span>
              <span className={styles.statSub}>applications per posting</span>
            </div>
          </div>

          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Jobs by Status</h2>
            <div className={styles.statusGrid}>
              {summary.jobs_by_status.map((s) => (
                <div className={styles.statusPill} key={s.status}>
                  <span
                    className={styles.pillDot}
                    style={{ background: STATUS_COLORS[s.status] ?? "#94a3b8" }}
                  />
                  <span className={styles.pillLabel}>{s.status}</span>
                  <span className={styles.pillCount}>{s.count}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.card}>
            <h2 className={styles.cardTitle}>
              Applications Trend — Last {days} days
            </h2>
            {trend.every((p) => p.count === 0) ? (
              <p className={styles.state}>No applications in this period.</p>
            ) : (
              <ResponsiveContainer width="100%" height={260}>
                <AreaChart data={trend} margin={{ top: 4, right: 16, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--admin-accent)" stopOpacity={0.18} />
                      <stop offset="95%" stopColor="var(--admin-accent)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--admin-border)" />
                  <XAxis
                    dataKey="date"
                    tickFormatter={formatDate}
                    tick={{ fontSize: 11, fill: "var(--admin-text-secondary)" }}
                    tickLine={false}
                    axisLine={false}
                    interval={Math.floor(trend.length / 6)}
                  />
                  <YAxis
                    allowDecimals={false}
                    tick={{ fontSize: 11, fill: "var(--admin-text-secondary)" }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      background: "var(--admin-card)",
                      border: "1px solid var(--admin-border)",
                      borderRadius: "8px",
                      fontSize: "13px",
                    }}
                    labelFormatter={formatDate}
                    formatter={(value: number) => [value, "Applications"]}
                  />
                  <Area
                    type="monotone"
                    dataKey="count"
                    stroke="var(--admin-accent)"
                    strokeWidth={2}
                    fill="url(#areaGrad)"
                    dot={false}
                    activeDot={{ r: 4 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>

          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Top Jobs by Applications</h2>
            {topJobs.length === 0 ? (
              <p className={styles.state}>No applications yet.</p>
            ) : (
              <table className={styles.topTable}>
                <thead>
                  <tr>
                    <th>Job Title</th>
                    <th>Department</th>
                    <th className={styles.barCell}>Applications</th>
                    <th>Count</th>
                  </tr>
                </thead>
                <tbody>
                  {topJobs.map((job) => (
                    <tr key={job.job_id}>
                      <td>{job.title}</td>
                      <td>{job.department}</td>
                      <td className={styles.barCell}>
                        <div className={styles.barTrack}>
                          <div
                            className={styles.barFill}
                            style={{
                              width: `${(job.application_count / maxApplications) * 100}%`,
                            }}
                          />
                        </div>
                      </td>
                      <td>
                        <span className={styles.countBadge}>
                          {job.application_count}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </>
      )}
    </div>
  );
}
