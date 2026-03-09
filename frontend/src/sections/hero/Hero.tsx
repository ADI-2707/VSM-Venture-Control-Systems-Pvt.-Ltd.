"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./Hero.module.css";
import { heroSlides } from "./sliderData";

export default function Hero() {
  const [index, setIndex] = useState(0);

  const total = heroSlides.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % total);
    }, 4000);

    return () => clearInterval(interval);
  }, [total]);

  const getPosition = (i: number) => {
    const prev = (index - 1 + total) % total;
    const next = (index + 1) % total;

    if (i === index) return styles.center;
    if (i === prev) return styles.left;
    if (i === next) return styles.right;
    return styles.hidden;
  };

  return (
    <section className={styles.hero}>
      <div className={styles.slider}>
        {heroSlides.map((slide, i) => (
          <div key={slide.id} className={`${styles.slide} ${getPosition(i)}`}>
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              priority={i === 0}
              className={styles.image}
            />

            <div className={styles.overlay}>
              <h1>{slide.title}</h1>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}