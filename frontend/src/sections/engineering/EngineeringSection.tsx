"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./EngineeringSection.module.css";

function CountUp({
  end,
  suffix = "",
  startAnimation,
}: {
  end: number;
  suffix?: string;
  startAnimation: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!startAnimation) return;

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
  }, [startAnimation, end]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

export default function EngineeringSection() {
  const metricsRef = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
        }
      },
      { threshold: 0.4 }
    );

    if (metricsRef.current) {
      observer.observe(metricsRef.current);
    }

    return () => {
      if (metricsRef.current) {
        observer.unobserve(metricsRef.current);
      }
    };
  }, []);

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

        <div ref={metricsRef} className={styles.metrics}>
          <div className={styles.metric}>
            <span className={styles.metricNumber}>
              <CountUp end={10} suffix="+" startAnimation={visible} />
            </span>
            <span className={styles.metricLabel}>Industrial Systems</span>
          </div>

          <div className={styles.metric}>
            <span className={styles.metricNumber}>
              <CountUp end={500} suffix="+" startAnimation={visible} />
            </span>
            <span className={styles.metricLabel}>Deployments</span>
          </div>

          <div className={styles.metric}>
            <span className={styles.metricNumber}>
              <CountUp end={10} suffix="K+" startAnimation={visible} />
            </span>
            <span className={styles.metricLabel}>Git Commits</span>
          </div>

          <div className={styles.metric}>
            <span className={styles.metricNumber}>
              <CountUp end={5} suffix="+" startAnimation={visible} />
            </span>
            <span className={styles.metricLabel}>Industries Served</span>
          </div>
        </div>
      </div>
    </section>
  );
}