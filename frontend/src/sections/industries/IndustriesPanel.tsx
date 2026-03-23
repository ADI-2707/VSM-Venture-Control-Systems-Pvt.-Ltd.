"use client";

import { useState } from "react";
import styles from "./IndustriesPanel.module.css";
import { industries } from "./industriesData";
import Image from "next/image";
import Link from "next/link";

export default function IndustriesPanel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = industries[activeIndex];

  return (
    <div className={styles.wrapper}>

      {/* LEFT LIST */}
      <div className={styles.sidebar}>
        {industries.map((industry, index) => (
          <div
            key={industry.id}
            className={`${styles.item} ${
              index === activeIndex ? styles.active : ""
            }`}
            onMouseEnter={() => setActiveIndex(index)}
            onClick={() => setActiveIndex(index)}
          >
            {industry.name}
          </div>
        ))}
      </div>

      {/* RIGHT DETAILS */}
      <div className={styles.content}>
        <div className={styles.imageWrapper}>
          <Image
            src={active.images[0]}
            alt={active.name}
            fill
            className={styles.image}
          />
        </div>

        <div className={styles.details}>
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