import "./globals.css";
import { Inter } from "next/font/google";
import { AuthProvider } from "@/context/AuthContext";
import { MediaProvider } from "@/context/MediaContext";
import { JobProvider } from "@/context/JobContext";
import { CTAProvider } from "@/context/CTAContext";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-primary",
  display: "swap",
});

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
      <body className={inter.variable}>
        <AuthProvider>
          <MediaProvider>
            <JobProvider>
              <CTAProvider>
                {children}
              </CTAProvider>
            </JobProvider>
          </MediaProvider>
        </AuthProvider>
      </body>
    </html>
  );
}