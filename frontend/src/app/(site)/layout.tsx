import Layout from "@/site/layout/Layout/Layout";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Layout>{children}</Layout>;
}