"use client";

import styles from "./CareerHero.module.css";

export default function CareerHero() {
  return (
    <div className={styles.wrapper}>
      <img
        src="/career/1.jpg"
        alt="Career"
        className={styles.image}
      />

      <div className={styles.overlay} />

      <div className={styles.content}>
        <h1 className={styles.heading}>
          Why Join Us
          <span className={styles.qMarks}>
            <span>?</span>
            <span>?</span>
            <span>?</span>
          </span>
        </h1>
      </div>
    </div>
  );
}