"use client";

import { useRBACGuard } from "@/hooks/useRBACGuard";
import KPIGrid from "@/internal/sections/dashboard/KPIGrid/KPIGrid";
import ActivityPanel from "@/internal/sections/dashboard/ActivityPanel/ActivityPanel";
import RecentUploads from "@/internal/sections/dashboard/RecentUploads/RecentUploads";
import styles from "./Dashboard.module.css";

export default function Page() {
  const { isAllowed, isLoading } = useRBACGuard();

  if (isLoading || !isAllowed) return null;

  return (
    <div className={styles.container}>
      <KPIGrid />
      <div className={styles.grid}>
        <ActivityPanel />
        <RecentUploads />
      </div>
    </div>
  );
}