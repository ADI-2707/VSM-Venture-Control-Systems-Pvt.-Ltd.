"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Sidebar from "@/internal/components/layout/Sidebar/Sidebar";
import Topbar from "@/internal/components/layout/Topbar/Topbar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!mounted) return;
    if (!user) router.replace("/internal");
  }, [user, mounted, router]);

  if (!mounted || !user) return null;

  return (
    <div style={{ display: "flex", height: "100vh", background: "var(--admin-bg)" }}>
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      <div style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        minWidth: 0,
      }}>
        <Topbar />

        <main style={{
          flex: 1,
          overflow: "auto",
          padding: "var(--admin-page-py) var(--admin-page-px)",
          display: "flex",
          flexDirection: "column",
          gap: "var(--admin-gap)",
        }}>
          {children}
        </main>
      </div>
    </div>
  );
}