"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
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

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const getTitle = () => {
    if (routeTitleMap[pathname]) return routeTitleMap[pathname];

    const match = Object.keys(routeTitleMap).find((route) =>
      pathname.startsWith(route)
    );

    return match ? routeTitleMap[match] : "Dashboard";
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    router.push("/internal");
  };

  return (
    <div className={styles.topbar}>
      <div className={styles.inner}>
        <div className={styles.title}>{getTitle()}</div>

        <div className={styles.actions}>
          <div
            className={styles.userWrapper}
            ref={dropdownRef}
          >
            <div
              className={styles.user}
              onClick={() => setOpen(!open)}
            >
              {user?.name || "User"} ▾
            </div>

            {open && (
              <div className={styles.dropdown}>
                <div className={styles.dropdownItem}>
                  {user?.role?.toUpperCase()}
                </div>

                <div className={styles.divider} />

                <div
                  className={styles.dropdownItem}
                  onClick={handleLogout}
                >
                  Logout
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}