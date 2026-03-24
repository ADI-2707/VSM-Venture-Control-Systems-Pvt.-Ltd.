"use client";

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

  if (showLoader === null) {
    return null;
  }

  return (
    <div className={styles.root}>
      
      <AnimatePresence>
        {showLoader && (
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

      {!showLoader && (
        <motion.div
          className={styles.wrapper}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Navbar />
          <main className={styles.content}>{children}</main>
          <Footer />
        </motion.div>
      )}
    </div>
  );
}