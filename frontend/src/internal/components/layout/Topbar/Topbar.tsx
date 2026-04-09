"use client";

import { usePathname, useRouter } from "next/navigation";
import styles from "./Topbar.module.css";
import { useAuth } from "@/internal/context/AuthContext";

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
  const router = useRouter();
  const { user, logout } = useAuth();

  const getTitle = () => {
    if (routeTitleMap[pathname]) return routeTitleMap[pathname];

    const match = Object.keys(routeTitleMap).find((route) =>
      pathname.startsWith(route)
    );

    return match ? routeTitleMap[match] : "Dashboard";
  };

  const handleLogout = () => {
    logout();
    router.push("/internal");
  };

  return (
    <div className={styles.topbar}>
      <div className={styles.inner}>
        <div className={styles.title}>{getTitle()}</div>

        <div className={styles.actions}>
          <div className={styles.user}>
            {user?.name || "User"}
          </div>

          <div className={styles.roleBadge}>
            {user?.role?.toUpperCase() || "ROLE"}
          </div>

          <button
            className={styles.logout}
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}