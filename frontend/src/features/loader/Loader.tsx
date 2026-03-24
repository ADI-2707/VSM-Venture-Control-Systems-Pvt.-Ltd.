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
        layoutId="logo"
        className={styles.logoWrapper}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: [1, 1.08, 1], y: [0, -4, 0], }}
        transition={{
          opacity: { duration: 0.5, ease: "easeOut" },
          scale: { duration: 1.2, ease: [0.22, 1, 0.36, 1], },
          layout: { duration: 0.9, ease: [0.22, 1, 0.36, 1], }
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
    </div>
  );
}