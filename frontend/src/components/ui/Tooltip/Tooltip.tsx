"use client";

import styles from "./Tooltip.module.css";

export default function Tooltip({
  children,
  label,
}: {
  children: React.ReactNode;
  label: string;
}) {
  return (
    <div className={styles.wrapper}>
      {children}
      <span className={styles.tooltip}>{label}</span>
    </div>
  );
}