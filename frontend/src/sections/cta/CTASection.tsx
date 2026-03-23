"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./CTASection.module.css";

export default function CTASection() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.2 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return (
    <section ref={ref} className={styles.cta}>
      <div
        className={`${styles.container} ${
          visible ? styles.visible : styles.hidden
        }`}
      >
        <div className={styles.inner}>

          <div className={styles.accent}></div>

          <h2 className={styles.title}>
            Build reliable industrial systems — without delays or rework
          </h2>

          <p className={styles.subtitle}>
            We design and deliver scalable automation, data platforms, and AI
            solutions tailored for real production environments.
          </p>

          <div className={styles.actions}>
            <a href="/contact" className={styles.primaryBtn}>
              <span>Schedule a Consultation</span>
              <span className={styles.arrow}>→</span>
            </a>

            <a href="/projects" className={styles.secondaryBtn}>
              View Our Work
            </a>
          </div>

          <p className={styles.microcopy}>
            No commitment. Just a focused technical discussion.
          </p>

          <p className={styles.trust}>
            Trusted by teams in steel, cement, and power industries
          </p>

        </div>
      </div>
    </section>
  );
}