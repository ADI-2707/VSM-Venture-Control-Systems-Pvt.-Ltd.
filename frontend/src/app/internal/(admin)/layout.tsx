"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Sidebar from "@/internal/components/layout/Sidebar/Sidebar";
import Topbar from "@/internal/components/layout/Topbar/Topbar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.replace("/internal");
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return null;
  }

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar />
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Topbar />
        <div style={{ flex: 1 }}>
          {children}
        </div>
      </div>
    </div>
  );
}