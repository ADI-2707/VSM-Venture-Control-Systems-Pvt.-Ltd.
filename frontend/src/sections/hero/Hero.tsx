"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
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

    if (i === index) return "center";
    if (i === prev) return "left";
    if (i === next) return "right";
    return "hidden";
  };

  return (
    <section className={styles.hero}>
      <div className={styles.slider}>
        {heroSlides.map((slide, i) => {
          const pos = getPosition(i);

          return (
            <motion.div
              key={slide.id}
              className={`${styles.slide} ${styles[pos]}`}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              whileTap={{ cursor: "grabbing" }}
            >
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                sizes="(max-width: 1200px) 90vw, 70vw"
                priority={i === 0}
                className={styles.image}
              />

              <div className={`${styles.fadeMask} ${styles[pos]}`} />

              <div className={`${styles.blurMask} ${styles[pos]}`} />

              <div className={styles.overlay}>
                <h1>{slide.title}</h1>
                <p>{slide.subtitle}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}