"use client";

import styles from "./Loader.module.css";

interface LoaderProps {
  onComplete: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  return (
    <div className={styles.overlay}>
      <div className={styles.content}>
        <h1>Loading VSM...</h1>
      </div>
    </div>
  );
}