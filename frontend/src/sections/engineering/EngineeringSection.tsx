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

        <div className={styles.metrics}>

          <div className={styles.metric}>
            <span className={styles.metricNumber}>10+</span>
            <span className={styles.metricLabel}>Industrial Systems</span>
          </div>

          <div className={styles.metric}>
            <span className={styles.metricNumber}>500+</span>
            <span className={styles.metricLabel}>Deployments</span>
          </div>

          <div className={styles.metric}>
            <span className={styles.metricNumber}>10K+</span>
            <span className={styles.metricLabel}>Git Commits</span>
          </div>

          <div className={styles.metric}>
            <span className={styles.metricNumber}>5+</span>
            <span className={styles.metricLabel}>Industries Served</span>
          </div>

        </div>

      </div>
    </section>
  );
}