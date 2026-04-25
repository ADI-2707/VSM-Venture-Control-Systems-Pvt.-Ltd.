"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../Sidebar/Sidebar";
import Topbar from "../Topbar/Topbar";
import styles from "./AdminLayout.module.css";
import { useAuth } from "@/context/AuthContext";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const { isAuthenticated, loading } = useAuth();

  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.replace("/internal");
    }
  }, [loading, isAuthenticated, router]);

  if (loading) {
    return <div className={styles.loader}>Loading...</div>;
  }

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