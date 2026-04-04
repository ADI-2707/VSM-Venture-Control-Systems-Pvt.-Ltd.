"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./EngineeringSection.module.css";

const metrics = [
  { value: 10, suffix: "+", label: "Industrial Systems" },
  { value: 500, suffix: "+", label: "Deployments" },
  { value: 10, suffix: "+", label: "Years of Transformation" },
  { value: 5, suffix: "+", label: "Industries Served" }
];

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
    const element = metricsRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.4 }
    );

    observer.observe(element);
    return () => observer.unobserve(element);
  }, []);

  return (
    <section className={`${styles.section} section-divider`}>
      <div className="container">
        <div className={styles.header}>
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

        <div
          ref={metricsRef}
          className={`${styles.metrics} ${visible ? styles.visible : ""}`}
        >
          {metrics.map((metric, index) => (
            <div key={index} className={styles.metric}>
              <div className={styles.metricContent}>
                <span className={styles.metricNumber}>
                  <CountUp
                    end={metric.value}
                    suffix={metric.suffix}
                    startAnimation={visible}
                  />
                </span>
                <span className={styles.metricLabel}>
                  {metric.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}