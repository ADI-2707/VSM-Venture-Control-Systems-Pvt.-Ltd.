"use client";

import styles from "./Sidebar.module.css";
import Link from "next/link";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useJobs } from "@/context/JobContext";
import { hasAccess } from "@/utils/rbac";
import Tooltip from "@/components/ui/Tooltip/Tooltip";

const navItems = [
  { label: "Dashboard", href: "/internal", icon: "/adminsidebar/dashboard.svg" },
  { label: "Content", href: "/internal/content", icon: "/adminsidebar/content.svg" },
  { label: "Projects", href: "/internal/projects", icon: "/adminsidebar/project.svg" },
  { label: "Jobs", href: "/internal/jobs", icon: "/adminsidebar/jobs.svg" },
  { label: "Analytics", href: "/internal/analytics", icon: "/adminsidebar/analytics.svg" },
  { label: "Monitoring", href: "/internal/monitoring", icon: "/adminsidebar/monitoring.svg" },
  { label: "Settings", href: "/internal/settings", icon: "/adminsidebar/settings.svg" },
];

export default function Sidebar({ collapsed, setCollapsed }: any) {
  const pathname = usePathname();
  const { user } = useAuth();
  const { hasNewApplications, clearSectionNotification } = useJobs();

  useEffect(() => {
    if (pathname.startsWith("/internal/jobs")) {
      clearSectionNotification();
    }
  }, [pathname, clearSectionNotification]);

  const filteredNavItems = navItems.filter((item) => {
    if (!user) return false;
    return hasAccess(user.role as any, item.href);
  });

  const isActive = (path: string) => {
    if (path === "/internal") {
      return pathname === "/internal" || pathname === "/internal/dashboard";
    }
    return pathname.startsWith(path);
  };

  return (
    <aside className={`${styles.sidebar} ${collapsed ? styles.collapsed : ""}`}>

      <div className={styles.header}>
        {!collapsed && <div className={styles.logo}>VSM</div>}

        <button
          className={styles.toggle}
          onClick={() => setCollapsed(!collapsed)}
        >
          ☰
        </button>
      </div>

      <nav className={styles.nav}>
        {filteredNavItems.map((item) => {
          const active = isActive(item.href);
          const showDot = item.label === "Jobs" && hasNewApplications;

          const link = (
            <Link
              key={item.href}
              href={item.href}
              className={`${styles.link} ${active ? styles.active : ""}`}
            >
              <div className={styles.iconContainer}>
                <img src={item.icon} className={styles.icon} alt={item.label} />
                {showDot && <div className={styles.dot} />}
              </div>
              {!collapsed && <span className={styles.label}>{item.label}</span>}
            </Link>
          );

          return collapsed ? (
            <Tooltip key={item.href} text={item.label}>
              {link}
            </Tooltip>
          ) : (
            link
          );
        })}
      </nav>
    </aside>
  );
}