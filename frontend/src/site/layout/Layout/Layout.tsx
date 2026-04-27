"use client";

import { usePathname } from "next/navigation";
import { AnimatePresence, motion, LayoutGroup } from "framer-motion";
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

  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <LayoutGroup>
      <div className={styles.root}>

        <div className={styles.wrapper}>
          <Navbar />
          <main className={`${styles.content} ${styles.withOffset}`}>{children}</main>
          <Footer />
        </div>

        <AnimatePresence>
          {showLoader && (
            <motion.div
              className={styles.loaderOverlay}
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Loader onComplete={() => setShowLoader(false)} />
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </LayoutGroup>
  );
}