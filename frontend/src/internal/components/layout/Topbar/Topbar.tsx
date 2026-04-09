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

  const getInitials = (name?: string) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  return (
    <div className={styles.topbar}>
      <div className={styles.inner}>
        <div className={styles.title}>{getTitle()}</div>

        <div className={styles.userMenu}>
          <div className={styles.avatar}>
            {getInitials(user?.name)}
          </div>

          <div className={styles.userInfo}>
            <div className={styles.userName}>
              {user?.name || "User"}
            </div>
            <div className={styles.userRole}>
              {user?.role?.toUpperCase() || "ROLE"}
            </div>
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