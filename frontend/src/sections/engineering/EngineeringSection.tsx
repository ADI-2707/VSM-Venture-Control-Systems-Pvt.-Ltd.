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

function handleMouseMove(
  e: React.MouseEvent<HTMLDivElement>,
  card: HTMLDivElement
) {
  const rect = card.getBoundingClientRect();

  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const centerX = rect.width / 2;
  const centerY = rect.height / 2;

  const rotateX = ((y - centerY) / centerY) * -4;
  const rotateY = ((x - centerX) / centerX) * 4;

  card.style.transform = `
    translateY(-8px)
    rotateX(${rotateX}deg)
    rotateY(${rotateY}deg)
    scale(1.03)
  `;
}

function handleMouseLeave(card: HTMLDivElement) {
  card.style.transform = "";
}

function handleMetricsMouseMove(
  e: React.MouseEvent<HTMLDivElement>,
  el: HTMLDivElement
) {
  const rect = el.getBoundingClientRect();

  const x = (e.clientX - rect.left) / rect.width;
  const y = (e.clientY - rect.top) / rect.height;

  const moveX = (x - 0.5) * 20;
  const moveY = (y - 0.5) * 20;

  el.style.setProperty("--ambient-x", `${moveX}px`);
  el.style.setProperty("--ambient-y", `${moveY}px`);
}

function handleMetricsLeave(el: HTMLDivElement) {
  el.style.setProperty("--ambient-x", `0px`);
  el.style.setProperty("--ambient-y", `0px`);
}

function MetricCard({
  value,
  suffix,
  label,
  visible
}: {
  value: number;
  suffix: string;
  label: string;
  visible: boolean;
}) {
  return (
    <div
      className={styles.metric}
      onMouseMove={(e) => handleMouseMove(e, e.currentTarget)}
      onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}
    >
      <div className={styles.shine}></div>

      <span className={styles.metricNumber}>
        <CountUp end={value} suffix={suffix} startAnimation={visible} />
      </span>

      <span className={styles.metricLabel}>{label}</span>
    </div>
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
        if (entry.isIntersecting) {
          setVisible(true);
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
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

        <div
          ref={metricsRef}
          className={`${styles.metrics} ${visible ? styles.visible : ""}`}
          onMouseMove={(e) => handleMetricsMouseMove(e, e.currentTarget)}
          onMouseLeave={(e) => handleMetricsLeave(e.currentTarget)}
        >
          {metrics.map((metric, index) => (
            <MetricCard
              key={index}
              value={metric.value}
              suffix={metric.suffix}
              label={metric.label}
              visible={visible}
            />
          ))}
        </div>
      </div>
    </section>
  );
}