"use client";

import styles from "./Sidebar.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Dashboard", href: "/internal" },
  { label: "Content", href: "/internal/content" },
  { label: "Media", href: "/internal/media" },
  { label: "Analytics", href: "/internal/analytics" },
  { label: "Monitoring", href: "/internal/monitoring" },
  { label: "Settings", href: "/internal/settings" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>VSM Admin</div>

      <nav className={styles.nav}>
        {navItems.map((item) => {
          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`${styles.link} ${active ? styles.active : ""}`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}