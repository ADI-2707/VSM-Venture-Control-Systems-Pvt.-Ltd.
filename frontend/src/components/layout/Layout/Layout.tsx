"use client";

import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import Loader from "@/features/loader/Loader";
import { useLoader } from "@/features/loader/useLoader";
import styles from "./Layout.module.css";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { showLoader, setShowLoader } = useLoader();

  return (
    <>
      {showLoader && (
        <Loader onComplete={() => setShowLoader(false)} />
      )}
      <div className={styles.wrapper}>
        <Navbar />
        <main className={styles.content}>{children}</main>
        <Footer />
      </div>
    </>
  );
}