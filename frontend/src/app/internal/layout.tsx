export default function InternalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        background: "var(--admin-bg)",
        minHeight: "100vh",
      }}
    >
      {children}
    </div>
  );
}