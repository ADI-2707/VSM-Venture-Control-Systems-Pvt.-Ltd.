"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Reveal.module.css";

type RevealProps = {
  children: React.ReactNode;
};

export default function Reveal({ children }: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const element = ref.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMounted(true);
          setVisible(true);
          observer.unobserve(element);
        }
      },
      {
        rootMargin: "120px", 
        threshold: 0.15
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`${styles.reveal} ${visible ? styles.visible : ""}`}
    >
      {mounted && children}
    </div>
  );
}