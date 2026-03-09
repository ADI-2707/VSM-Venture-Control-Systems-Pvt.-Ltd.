"use client";

import { useEffect } from "react";
import styles from "./Loader.module.css";

interface LoaderProps {
  onComplete: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 1500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className={styles.overlay}>
      <div className={styles.content}>
        <h1>Loading VSM...</h1>
      </div>
    </div>
  );
}