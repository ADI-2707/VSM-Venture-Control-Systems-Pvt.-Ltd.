"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../Sidebar/Sidebar";
import Topbar from "../Topbar/Topbar";
import styles from "./AdminLayout.module.css";
import { useAuth } from "@/internal/context/AuthContext";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const { isAuthenticated } = useAuth();

  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/internal");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) return null;

  return (
    <div className={styles.root}>
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      <div
        className={`${styles.main} ${
          collapsed ? styles.collapsed : styles.expanded
        }`}
      >
        <Topbar />

        <div className={styles.container}>
          <div className={styles.content}>{children}</div>
        </div>
      </div>
    </div>
  );
}