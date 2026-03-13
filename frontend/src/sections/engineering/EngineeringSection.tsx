"use client";

import styles from "./EngineeringSection.module.css";

export default function EngineeringSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>

        <h2 className={styles.title}>
          Engineering Automation for Modern Industry
        </h2>

        <p className={styles.description}>
          VSM Venture delivers reliable industrial automation, control systems,
          and system integration solutions designed to improve productivity,
          efficiency, and operational safety across complex manufacturing
          environments.
        </p>

      </div>
    </section>
  );
}