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
    let timer: NodeJS.Timeout;

    const startSlider = () => {
      timer = setTimeout(() => {
        setIndex((prev) => (prev + 1) % total);
        startSlider();
      }, 4000);
    };

    startSlider();

    return () => clearTimeout(timer);
  }, [total]);

  useEffect(() => {
    const handleScroll = () => {
      const hero = document.querySelector(`.${styles.hero}`) as HTMLElement;
      if (!hero) return;

      const offset = window.scrollY * 0.05; // subtle movement
      hero.style.setProperty("--bg-shift", `${offset}px`);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % total);
  };

  const prevSlide = () => {
    setIndex((prev) => (prev - 1 + total) % total);
  };

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

        <button
          className={`${styles.navButton} ${styles.navLeft}`}
          onClick={prevSlide}
          aria-label="Previous slide"
        >
          <span>‹</span>
        </button>

        <button
          className={`${styles.navButton} ${styles.navRight}`}
          onClick={nextSlide}
          aria-label="Next slide"
        >
          <span>›</span>
        </button>

        {heroSlides.map((slide, i) => {
          const pos = getPosition(i);
          const isCenter = pos === "center";

          return (
            <div
              key={slide.id}
              className={`${styles.slide} ${styles[pos]}`}
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
                <motion.h1
                  initial={{ opacity: 0, y: 40 }}
                  animate={
                    isCenter
                      ? { opacity: 1, y: 0 }
                      : { opacity: 0, y: 40 }
                  }
                  transition={{
                    duration: 0.8,
                    ease: "easeOut"
                  }}
                >
                  {slide.title}
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 40 }}
                  animate={
                    isCenter
                      ? { opacity: 1, y: 0 }
                      : { opacity: 0, y: 40 }
                  }
                  transition={{
                    duration: 0.8,
                    delay: 0.3,
                    ease: "easeOut"
                  }}
                >
                  {slide.subtitle}
                </motion.p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}