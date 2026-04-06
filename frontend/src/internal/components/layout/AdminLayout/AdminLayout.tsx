"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Sidebar from "../Sidebar/Sidebar";
import Topbar from "../Topbar/Topbar";
import styles from "./AdminLayout.module.css";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [authorized, setAuthorized] = useState(false);

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("auth");

    if (!isLoggedIn) {
      router.push("/internal");
    } else {
      setAuthorized(true);
    }
  }, [pathname]);

  if (!authorized) return null;

  return (
    <div className={styles.root}>
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      <div
        className={`${styles.main} ${collapsed ? styles.collapsed : styles.expanded
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