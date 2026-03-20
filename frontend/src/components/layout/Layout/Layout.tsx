"use client";

import { useEffect, useState } from "react";
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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      setMounted(true);
    });

    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    if (showLoader) {
      const timer = setTimeout(() => {
        setShowLoader(false);
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [showLoader, setShowLoader]);

  if (!mounted) {
    return (
      <div className={styles.wrapper}>
        <Navbar />
        <main className={styles.content}>{children}</main>
        <Footer />
      </div>
    );
  }

  return (
    <div className={styles.root}>
      {showLoader && (
        <div className={styles.loaderOverlay}>
          <Loader onComplete={() => setShowLoader(false)} />
        </div>
      )}

      <div className={styles.wrapper}>
        <Navbar />
        <main className={styles.content}>{children}</main>
        <Footer />
      </div>
    </div>
  );
}