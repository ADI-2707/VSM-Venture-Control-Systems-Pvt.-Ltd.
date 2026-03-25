"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./TestimonialsSection.module.css";

const testimonials = [
  {
    quote:
      "Their engineering discipline and ability to understand industrial systems made a huge difference to our production monitoring platform.",
    name: "Production Engineering Lead",
    company: "Steel Manufacturing Company",
  },
  {
    quote:
      "A reliable technology partner. The systems they delivered were stable, well-architected, and easy for our teams to operate.",
    name: "Automation Manager",
    company: "Industrial Automation Team",
  },
  {
    quote:
      "They approached the project with strong engineering practices and delivered a scalable system that integrated well with our production environment.",
    name: "Technical Director",
    company: "Manufacturing Technology Group",
  },
];

export default function TestimonialsSection() {
  const loopData = [...testimonials, ...testimonials];

  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -20% 0px",
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section ref={sectionRef} className={`${styles.testimonials} section-divider`}>
      <div className="container">
        <div
          className={`${styles.scrollerWrapper} ${isVisible ? styles.scrollerVisible : styles.scrollerHidden
            }`}
        >
          <div
            className={`${styles.scroller} ${isVisible ? styles.play : styles.pause
              }`}
          >
            {loopData.map((t, index) => (
              <div key={index} className={styles.card}>
                <div className={styles.topLine}></div>
                <div className={styles.streak}></div>

                <p className={styles.quote}>“{t.quote}”</p>

                <div className={styles.author}>
                  <span className={styles.name}>{t.name}</span>
                  <span className={styles.company}>{t.company}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div
          className={`${styles.headingBlock} ${isVisible ? styles.headingVisible : styles.headingHidden
            }`}
        >
          <span className={styles.label}>Testimonials</span>

          <h2 className={styles.title}>What our partners say</h2>

          <p className={styles.subtitle}>
            Trusted by industry leaders across multiple sectors.
          </p>
        </div>

      </div>
    </section>
  );
}