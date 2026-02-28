import "./globals.css";
import Layout from "@/components/layout/Layout/Layout";

export const metadata = {
  title: "VSM Venture Control Systems Pvt. Ltd.",
  description: "Industrial Automation & Control Systems",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}