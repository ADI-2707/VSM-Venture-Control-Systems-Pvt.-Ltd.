import AdminLayout from "@/internal/components/layout/AdminLayout/AdminLayout";

export default function InternalAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminLayout>{children}</AdminLayout>;
}