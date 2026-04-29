"use client";

import { useEffect, useState } from "react";
import api from "@/utils/axios";
import styles from "./ActivityPanel.module.css";

export default function ActivityPanel() {
  const [data, setData] = useState<{ online_users: string[]; recent_activities: any[] } | null>(null);

  useEffect(() => {
    api.get("/admin/monitoring/dashboard/activity")
      .then(res => setData(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className={styles.panel}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <h3 className={styles.title} style={{ margin: 0 }}>Team Activity</h3>
        {data && (
          <div style={{ fontSize: 12, color: "#10b981", display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#10b981" }} />
            {data.online_users.length} Online
          </div>
        )}
      </div>

      {!data ? (
        <p style={{ fontSize: 12, color: "gray" }}>Loading activity...</p>
      ) : (
        <ul className={styles.list}>
          {data.recent_activities.length === 0 ? (
            <li style={{ fontSize: 12, color: "gray" }}>No recent activity.</li>
          ) : (
            data.recent_activities.map((log, i) => (
              <li key={i} style={{ fontSize: 12, marginBottom: 8, paddingBottom: 8, borderBottom: "1px solid var(--admin-border)" }}>
                <div style={{ color: "var(--admin-text-secondary)", fontSize: 10, marginBottom: 4 }}>{log.time}</div>
                <div><strong style={{ color: "#d946ef" }}>{log.actor}</strong> {log.action.toLowerCase()}</div>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}