"use client";

import { useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import styles from "./Loader.module.css";

interface LoaderProps {
  onComplete: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 1600);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className={styles.overlay}>
      <motion.div
        className={styles.logoWrapper}
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.8,
          ease: [0.25, 1, 0.5, 1],
        }}
      >
        <motion.div
          animate={{ scale: [1, 1.04, 1] }}
          transition={{
            duration: 1.4,
            ease: "easeInOut",
          }}
        >
          <Image
            src="/logo2.png"
            alt="VSM Logo"
            width={320}
            height={120}
            priority
          />
        </motion.div>
      </motion.div>
    </div>
  );
}