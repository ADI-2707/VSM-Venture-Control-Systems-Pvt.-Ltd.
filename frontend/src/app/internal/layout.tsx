import { AuthProvider } from "@/internal/context/AuthContext";

export default function InternalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthProvider>{children}</AuthProvider>;
}