"use client";

import { useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Topbar from "../Topbar/Topbar";
import styles from "./AdminLayout.module.css";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={styles.root}>
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      <div
        className={`${styles.main} ${collapsed ? styles.collapsed : styles.expanded
          }`}
      >
        <Topbar />
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
}