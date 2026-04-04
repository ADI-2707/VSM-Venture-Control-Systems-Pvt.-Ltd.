"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import styles from "./ApplicationHero.module.css";

const slides = [
  {
    src: "/applications/cccl.jfif",
    title: "Continuous Color Coating Line",
    subtitle: "Precision coating automation for superior surface finish",
  },
  {
    src: "/applications/cgl.jfif",
    title: "Continuous Galvanizing Line",
    subtitle: "Advanced galvanizing control for corrosion resistance",
  },
  {
    src: "/applications/crm.jfif",
    title: "Cold Rolling Mill",
    subtitle: "High-accuracy thickness control and surface quality",
  },
  {
    src: "/applications/hsm.jfif",
    title: "Hot Strip Mill",
    subtitle: "Robust automation for high-temperature rolling processes",
  },
  {
    src: "/applications/pl.jfif",
    title: "Pickling Line",
    subtitle: "Efficient oxide removal with process optimization",
  },
  {
    src: "/applications/pm.jfif",
    title: "Paper Machine",
    subtitle: "Consistent quality through intelligent process control",
  },
  {
    src: "/applications/rl.jfif",
    title: "Rewinding Line",
    subtitle: "Precision tension and alignment control systems",
  },
  {
    src: "/applications/sl.jfif",
    title: "Slitting Line",
    subtitle: "Accurate cutting with high-speed automation",
  },
  {
    src: "/applications/spm.jfif",
    title: "Skin Pass Mill",
    subtitle: "Enhanced surface finish and mechanical properties",
  },
];

export default function ApplicationHero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 4500);

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
            src={slides[index].src}
            alt={slides[index].title}
            fill
            priority
            className={styles.image}
          />
        </motion.div>
      </AnimatePresence>

      <div className="container">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            className={styles.content}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.15,
                },
              },
              exit: {},
            }}
          >
            <motion.h1
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
                exit: { opacity: 0, y: -10 },
              }}
              transition={{ duration: 0.6 }}
            >
              {slides[index].title}
            </motion.h1>

            <motion.p
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
                exit: { opacity: 0, y: -10 },
              }}
              transition={{ duration: 0.6 }}
            >
              {slides[index].subtitle}
            </motion.p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className={styles.dots}>
        {slides.map((_, i) => (
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