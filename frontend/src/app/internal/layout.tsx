import AdminLayout from "@/internal/components/layout/AdminLayout/AdminLayout";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminLayout>{children}</AdminLayout>;
}