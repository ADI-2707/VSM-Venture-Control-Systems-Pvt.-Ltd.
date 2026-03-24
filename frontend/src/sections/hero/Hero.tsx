"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import styles from "./Hero.module.css";
import { heroSlides } from "./sliderData";

export default function Hero() {
  const [index, setIndex] = useState(0);
  const [inView, setInView] = useState(true);
  const [prevIndex, setPrevIndex] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [isHoveringImage, setIsHoveringImage] = useState(false);

  const idleTimer = useRef<NodeJS.Timeout | null>(null);

  const heroRef = useRef<HTMLElement | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const touchStartTime = useRef(0);

  const total = heroSlides.length;

  useEffect(() => {
    const handleMove = () => {
      setShowControls(true);

      if (idleTimer.current) clearTimeout(idleTimer.current);

      idleTimer.current = setTimeout(() => {
        setShowControls(false);
      }, 2000);
    };

    handleMove();

    window.addEventListener("mousemove", handleMove);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      if (idleTimer.current) clearTimeout(idleTimer.current);
    };
  }, []);

  useEffect(() => {
    if (!heroRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { threshold: 0.35 }
    );

    observer.observe(heroRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (inView) {
      intervalRef.current = setInterval(() => {
        setPrevIndex(index);
        setIndex((prev) => (prev + 1) % total);
      }, 4000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [inView, total, index]);

  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current) return;
      const offset = window.scrollY * 0.05;
      heroRef.current.style.setProperty("--bg-shift", `${offset}px`);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const nextSlide = () => {
    setPrevIndex(index);
    setIndex((prev) => (prev + 1) % total);
  };

  const prevSlide = () => {
    setPrevIndex(index);
    setIndex((prev) => (prev - 1 + total) % total);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartTime.current = Date.now();
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const distance = touchStartX.current - touchEndX.current;
    const time = Date.now() - touchStartTime.current;

    const isFastSwipe = time < 250 && Math.abs(distance) > 30;
    const isNormalSwipe = Math.abs(distance) > 60;

    if (distance > 0 && (isFastSwipe || isNormalSwipe)) {
      nextSlide();
    } else if (distance < 0 && (isFastSwipe || isNormalSwipe)) {
      prevSlide();
    }
  };

  const getPosition = (i: number) => {
    const prev = (index - 1 + total) % total;
    const next = (index + 1) % total;

    if (i === index || total === 1) return "center";
    if (i === prev) return "left";
    if (i === next) return "right";
    return "hidden";
  };

  return (
    <section ref={heroRef} className={styles.hero}>
      <div className={styles.heroInner}>

        <div className={styles.progressContainer}>
          {heroSlides.map((_, i) => (
            <div key={i} className={styles.progressSegment}>
              <div
                className={`
                  ${styles.progressFill}
                  ${i < index ? styles.filled : ""}
                  ${i === index ? styles.animate : ""}
                `}
              />
            </div>
          ))}
        </div>

        <div
          className={styles.slider}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <button
            className={`${styles.navButton} ${styles.navLeft}`}
            onClick={prevSlide}
            style={{
              opacity: showControls && isHoveringImage ? 1 : 0,
              pointerEvents: showControls && isHoveringImage ? "auto" : "none",
            }}
          >
            ‹
          </button>

          <button
            className={`${styles.navButton} ${styles.navRight}`}
            onClick={nextSlide}
            style={{
              opacity: showControls && isHoveringImage ? 1 : 0,
              pointerEvents: showControls && isHoveringImage ? "auto" : "none",
            }}
          >
            ›
          </button>

          {heroSlides.map((slide, i) => {
            const pos = getPosition(i);
            const isCenter = pos === "center";

            return (
              <div key={slide.id} className={`${styles.slide} ${styles[pos]}`}>
                <div
                  className={styles.imageWrapper}
                  onMouseEnter={() => {
                    if (pos === "center") setIsHoveringImage(true);
                  }}
                  onMouseLeave={() => setIsHoveringImage(false)}
                >
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    fill
                    sizes="(max-width: 1200px) 90vw, 70vw"
                    priority={i === 0}
                    className={styles.image}
                  />
                </div>

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
                    transition={{ duration: 0.8 }}
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
                    transition={{ duration: 0.8, delay: 0.3 }}
                  >
                    {slide.subtitle}
                  </motion.p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}