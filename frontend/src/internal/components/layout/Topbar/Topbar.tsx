"use client";

import { usePathname, useRouter } from "next/navigation";
import styles from "./Topbar.module.css";
import { useAuth } from "@/context/AuthContext";

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

  const getInitials = (firstName?: string) => {
    if (!firstName) return "U";
    return firstName[0].toUpperCase();
  };

  return (
    <div className={styles.topbar}>
      <div className={styles.inner}>
        <div className={styles.title}>{getTitle()}</div>

        <div className={styles.userMenu}>
          <div className={styles.avatar}>
            {getInitials(user?.first_name)}
          </div>

          <div className={styles.userInfo}>
            <div className={styles.userName}>
              {user?.first_name ? `${user.first_name} ${user.last_name ?? ""}`.trim() : "User"}
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