"use client";

import styles from "./IndustriesDeck.module.css";
import Image from "next/image";

interface Industry {
  id: number;
  name: string;
  slug: string;
  description: string;
  icon: string;
  bullets: string[];
  images: string[];
}

interface Props {
  industry: Industry;
  index: number;
  activeIndex: number;
  setActiveIndex: (index: number) => void;
}

export default function IndustryCard({
  industry,
  index,
  activeIndex,
  setActiveIndex,
}: Props) {
  const isActive = index === activeIndex;

  return (
    <div
      className={`${styles.card} ${isActive ? styles.active : ""}`}
      style={{
        transform: `translateY(${index * 20}px) translateX(${index * 40}px)`,
        zIndex: 100 - index,
      }}
      onMouseEnter={() => setActiveIndex(index)}
      onClick={() => setActiveIndex(index)}
    >
      <div className={styles.inner}>
        {/* LEFT CONTENT */}
        <div className={styles.content}>
          <h3>{industry.name}</h3>
          <p>{industry.description}</p>

          {isActive && (
            <ul>
              {industry.bullets.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
          )}
        </div>

        {/* RIGHT IMAGES */}
        {isActive && (
          <div className={styles.images}>
            {industry.images.map((img, i) => (
              <Image
                key={i}
                src={img}
                alt={industry.name}
                width={200}
                height={140}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}