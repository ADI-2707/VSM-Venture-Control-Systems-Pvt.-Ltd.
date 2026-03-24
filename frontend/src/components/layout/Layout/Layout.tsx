"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
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

  const showLoaderSafe = mounted && showLoader;

  return (
    <div className={styles.root}>
      <AnimatePresence>
        {showLoaderSafe && (
          <motion.div
            className={styles.loaderOverlay}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Loader onComplete={() => setShowLoader(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      <div className={styles.wrapper}>
        <Navbar />
        <main className={styles.content}>{children}</main>
        <Footer />
      </div>
    </div>
  );
}