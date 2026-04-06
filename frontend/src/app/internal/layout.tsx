import AdminLayout from "../../internal/components/layout/AdminLayout/AdminLayout";

export default function InternalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminLayout>{children}</AdminLayout>;
}