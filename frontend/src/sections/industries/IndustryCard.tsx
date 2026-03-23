"use client";

import styles from "./IndustriesDeck.module.css";
import Image from "next/image";

export default function IndustryCard({
  industry,
  index,
  activeIndex,
  setActiveIndex,
}: any) {
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
        {/* LEFT */}
        <div className={styles.content}>
          <h3>{industry.name}</h3>
          <p>{industry.description}</p>

          {isActive && (
            <ul>
              {industry.bullets.map((b: string, i: number) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
          )}
        </div>

        {/* RIGHT */}
        {isActive && (
          <div className={styles.images}>
            {industry.images.map((img: string, i: number) => (
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