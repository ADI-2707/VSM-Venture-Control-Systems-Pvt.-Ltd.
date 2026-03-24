"use client";

import { useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import styles from "./Loader.module.css";
import { useIsMobile } from "@/hooks/useIsMobile";

interface LoaderProps {
  onComplete: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isMobile === null) return;

    const duration = isMobile ? 900 : 1600;

    const timer = setTimeout(() => {
      onComplete();
    }, duration);

    return () => clearTimeout(timer);
  }, [onComplete, isMobile]);

  if (isMobile === null) return null;

  return (
    <div className={styles.overlay}>
      <motion.div
        layoutId={isMobile ? undefined : "logo"}
        className={styles.logoWrapper}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{
          opacity: 1,
          scale: isMobile ? 1 : [1, 1.08, 1],
          y: isMobile ? 0 : [0, -4, 0],
        }}
        transition={{
          opacity: { duration: 0.5, ease: "easeOut" },
          scale: {
            duration: isMobile ? 0.6 : 1.2,
            ease: [0.22, 1, 0.36, 1],
          },
          layout: {
            duration: 0.9,
            ease: [0.22, 1, 0.36, 1],
          },
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