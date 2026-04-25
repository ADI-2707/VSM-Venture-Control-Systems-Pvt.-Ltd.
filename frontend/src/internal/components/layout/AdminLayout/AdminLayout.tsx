"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../Sidebar/Sidebar";
import Topbar from "../Topbar/Topbar";
import styles from "./AdminLayout.module.css";
import { useAuth } from "@/context/AuthContext";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!mounted) return;
    if (!user) router.replace("/internal");
  }, [user, mounted, router]);

  if (!mounted || !user) return null;

  return (
    <div className={styles.root}>
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <div className={`${styles.main} ${collapsed ? styles.collapsed : styles.expanded}`}>
        <Topbar />
        <div className={styles.container}>
          <div className={styles.content}>{children}</div>
        </div>
      </div>
    </div>
  );
}