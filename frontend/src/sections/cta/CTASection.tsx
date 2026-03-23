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
            Ready to build reliable industrial software systems?
          </h2>

          <p className={styles.subtitle}>
            We help engineering and manufacturing teams design and build
            scalable data platforms, automation systems, and AI solutions
            for real-world production environments.
          </p>

          <div className={styles.actions}>
            <a href="/contact" className={styles.primaryBtn}>
              Schedule a Consultation →
            </a>

            <a href="/projects" className={styles.secondaryBtn}>
              View Our Work
            </a>
          </div>

          <p className={styles.trust}>
            Trusted by industrial teams across steel, cement, and power sectors
          </p>

        </div>
      </div>
    </section>
  );
}