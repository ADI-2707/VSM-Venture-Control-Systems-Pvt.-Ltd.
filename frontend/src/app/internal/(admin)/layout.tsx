"use client";

import AdminLayout from "@/internal/components/layout/AdminLayout/AdminLayout";
import { MediaProvider } from "@/internal/context/MediaContext";

export default function InternalAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MediaProvider>
      <AdminLayout>{children}</AdminLayout>
    </MediaProvider>
  );
}