"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import KPIGrid from "@/internal/sections/dashboard/KPIGrid/KPIGrid";
import ActivityPanel from "@/internal/sections/dashboard/ActivityPanel/ActivityPanel";
import RecentUploads from "@/internal/sections/dashboard/RecentUploads/RecentUploads";
import styles from "./Dashboard.module.css";

export default function InternalPage() {
  
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