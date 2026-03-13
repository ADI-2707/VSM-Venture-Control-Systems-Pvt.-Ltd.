"use client";

import { useEffect, useState } from "react";
import styles from "./EngineeringSection.module.css";

function CountUp({ end, suffix = "" }: { end: number; suffix?: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1200;
    const stepTime = 16;
    const increment = end / (duration / stepTime);

    const timer = setInterval(() => {
      start += increment;

      if (start >= end) {
        start = end;
        clearInterval(timer);
      }

      setCount(Math.floor(start));
    }, stepTime);

    return () => clearInterval(timer);
  }, [end]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

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
            <span className={styles.metricNumber}>
              <CountUp end={10} suffix="+" />
            </span>
            <span className={styles.metricLabel}>Industrial Systems</span>
          </div>

          <div className={styles.metric}>
            <span className={styles.metricNumber}>
              <CountUp end={500} suffix="+" />
            </span>
            <span className={styles.metricLabel}>Deployments</span>
          </div>

          <div className={styles.metric}>
            <span className={styles.metricNumber}>
              <CountUp end={10} suffix="K+" />
            </span>
            <span className={styles.metricLabel}>Git Commits</span>
          </div>

          <div className={styles.metric}>
            <span className={styles.metricNumber}>
              <CountUp end={5} suffix="+" />
            </span>
            <span className={styles.metricLabel}>Industries Served</span>
          </div>

        </div>

      </div>
    </section>
  );
}