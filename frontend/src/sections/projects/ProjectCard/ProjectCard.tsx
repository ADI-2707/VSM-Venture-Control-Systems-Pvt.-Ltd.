"use client";

import Image from "next/image";
import { useState, useRef } from "react";
import styles from "./ProjectCard.module.css";

interface Props {
  image: string;
  application: string;
  customer: string;
  location: string;
}

export default function ProjectCard({
  image,
  application,
  customer,
  location,
}: Props) {

  const [active, setActive] = useState(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const arrowRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleEnter = () => {

    if (arrowRef.current && buttonRef.current) {

      const arrowRect = arrowRef.current.getBoundingClientRect();
      const buttonRect = buttonRef.current.getBoundingClientRect();

      const distance = buttonRect.left - arrowRect.left - 28;

      arrowRef.current.style.setProperty("--arrow-move", `${distance}px`);
    }

    timerRef.current = setTimeout(() => {
      setActive(true);
    }, 350);
  };

  const handleLeave = () => {

    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    setActive(false);
  };

  return (
    <div
      className={styles.card}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <div className={styles.inner}>
        <div className={styles.imageWrapper}>
          <Image
            src={image}
            alt={application}
            fill
            sizes="(max-width:1200px) 50vw, 25vw"
            className={styles.image}
          />
        </div>

        <div className={styles.content}>
          <div className={styles.row}>
            <span className={styles.label}>Application</span>
            <span className={styles.value}>{application}</span>
          </div>

          <div className={styles.row}>
            <span className={styles.label}>Customer Name</span>
            <span className={styles.value}>{customer}</span>
          </div>

          <div className={styles.row}>
            <span className={styles.label}>Location</span>
            <span className={styles.value}>{location}</span>
          </div>

          <div className={styles.actionRow}>
            <div ref={arrowRef} className={styles.arrowTrack}>
              <svg
                className={styles.arrow}
                width="16"
                height="9"
                viewBox="0 0 22 12"
                fill="none"
              >
                <path
                  d="M1 6H18M18 6L13 1M18 6L13 11"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <button
              ref={buttonRef}
              className={`${styles.seeMore} ${active ? styles.visible : ""}`}
              disabled={!active}
            >
              See More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}