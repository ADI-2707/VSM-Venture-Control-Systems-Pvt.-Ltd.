"use client";

import AdminLayout from "@/internal/components/layout/AdminLayout/AdminLayout";
import { MediaProvider } from "@/internal/context/MediaContext";
import { AuthProvider } from "@/internal/context/AuthContext";

export default function InternalAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <MediaProvider>
        <AdminLayout>{children}</AdminLayout>
      </MediaProvider>
    </AuthProvider>
  );
}