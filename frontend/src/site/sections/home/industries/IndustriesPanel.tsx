"use client";

import { useState } from "react";
import styles from "./IndustriesPanel.module.css";
import { industries } from "./industriesData";
import Image from "next/image";
import Link from "next/link";

export default function IndustriesPanel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [displayIndex, setDisplayIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleChange = (index: number) => {
    if (index === displayIndex) return;

    setIsAnimating(true);

    setTimeout(() => {
      setDisplayIndex(index);
      setIsAnimating(false);
    }, 180);

    setActiveIndex(index);
  };

  const active = industries[displayIndex];

  return (
    <div className={styles.wrapper}>
      <div className={styles.sidebar}>
        {industries.map((industry, index) => (
          <div
            key={industry.id}
            className={`${styles.item} ${
              index === activeIndex ? styles.active : ""
            }`}
            onMouseEnter={() => handleChange(index)}
            onClick={() => handleChange(index)}
          >
            {industry.name}
          </div>
        ))}
      </div>

      <div className={styles.content}>

        <div
          className={`${styles.imageWrapper} ${
            isAnimating ? styles.fadeOut : styles.fadeIn
          }`}
        >
          <Image
            src={active.images[0]}
            alt={active.name}
            fill
            className={styles.image}
          />
        </div>

        <div
          className={`${styles.details} ${
            isAnimating ? styles.textOut : styles.textIn
          }`}
        >
          <h3>{active.name}</h3>
          <p>{active.description}</p>

          <ul>
            {active.bullets.map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>

          <Link href={`/industries/${active.slug}`} className={styles.cta}>
            Explore Industry →
          </Link>
        </div>
      </div>
    </div>
  );
}