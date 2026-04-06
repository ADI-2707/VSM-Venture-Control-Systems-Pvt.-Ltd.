"use client";

import styles from "./Tooltip.module.css";

export default function Tooltip({ text, children, position = "right" }: any) {
  return (
    <div className={styles.wrapper}>
      {children}
      <div className={`${styles.tooltip} ${styles[position]}`}>
        {text}
      </div>
    </div>
  );
}