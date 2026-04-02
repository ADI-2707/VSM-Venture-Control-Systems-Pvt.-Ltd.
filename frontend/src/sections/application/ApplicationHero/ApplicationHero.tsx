"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import styles from "./ApplicationHero.module.css";

const images = [
  "/applications/cccl.jfif",
  "/applications/cgl.jfif",
  "/applications/crm.jfif",
  "/applications/hsm.jfif",
  "/applications/pl.jfif",
  "/applications/pm.jfif",
  "/applications/rl.jfif",
  "/applications/sl.jfif",
  "/applications/spm.jfif",
];

export default function ApplicationHero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className={styles.hero}>
      <div className={styles.overlay} />

      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          className={styles.imageWrapper}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1.05 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <Image
            src={images[index]}
            alt="Application Areas"
            fill
            priority
            className={styles.image}
          />
        </motion.div>
      </AnimatePresence>

      <div className="container">
        <div className={styles.content}>
          <h1>Application Areas</h1>
          <p>Delivering Industrial Automation Across Domains</p>
        </div>
      </div>

      {/* ✅ Dots Indicator */}
      <div className={styles.dots}>
        {images.map((_, i) => (
          <span
            key={i}
            className={`${styles.dot} ${i === index ? styles.active : ""}`}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </section>
  );
}