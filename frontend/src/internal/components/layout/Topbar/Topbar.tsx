"use client";

import { usePathname } from "next/navigation";
import styles from "./Topbar.module.css";

const routeTitleMap: Record<string, string> = {
  "/internal": "Dashboard",
  "/internal/dashboard": "Dashboard",
  "/internal/content": "Content",
  "/internal/media": "Media",
  "/internal/analytics": "Analytics",
  "/internal/monitoring": "Monitoring",
  "/internal/settings": "Settings",
};

export default function Topbar() {
  const pathname = usePathname();

  const getTitle = () => {
    if (routeTitleMap[pathname]) return routeTitleMap[pathname];

    const match = Object.keys(routeTitleMap).find((route) =>
      pathname.startsWith(route)
    );

    return match ? routeTitleMap[match] : "Dashboard";
  };

  return (
    <div className={styles.topbar}>
      <div className={styles.inner}>
        <div className={styles.title}>{getTitle()}</div>

        <div className={styles.actions}>
          <div className={styles.user}>Admin</div>
        </div>
      </div>
    </div>
  );
}