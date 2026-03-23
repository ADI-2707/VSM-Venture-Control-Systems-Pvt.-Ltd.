"use client";

import { useState, useRef, useEffect } from "react";
import styles from "./Projects.module.css";
import { projects } from "../projectData";
import ProjectCard from "../ProjectCard/ProjectCard";

export default function Projects() {
  const [index, setIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(4);
  const [translateX, setTranslateX] = useState(0);

  const startX = useRef(0);
  const currentX = useRef(0);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const update = () => {
      if (window.innerWidth <= 600) setVisibleCount(1);
      else if (window.innerWidth <= 1024) setVisibleCount(2);
      else setVisibleCount(4);
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    if (!trackRef.current) return;

    const firstCard = trackRef.current.children[0] as HTMLElement;
    if (!firstCard) return;

    const gap = 28;
    const cardWidth = firstCard.offsetWidth;

    setTranslateX(index * (cardWidth + gap));
  }, [index, visibleCount]);

  const handleTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    currentX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = startX.current - currentX.current;

    if (Math.abs(diff) < 50) return;

    if (diff > 0) {
      if (index < projects.length - visibleCount) {
        setIndex((prev) => prev + 1);
      }
    } else {
      if (index > 0) {
        setIndex((prev) => prev - 1);
      }
    }
  };

  const handleNext = () => {
    if (index >= projects.length - visibleCount) return;
    setIndex((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (index === 0) return;
    setIndex((prev) => prev - 1);
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>
          Latest Projects And Updates.
        </h2>

        <div
          className={styles.carouselViewport}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            ref={trackRef}
            className={styles.carouselTrack}
            style={{
              transform: `translateX(-${translateX}px)`
            }}
          >
            {projects.map((project) => (
              <div key={project.id} className={styles.carouselItem}>
                <ProjectCard
                  image={project.image}
                  application={project.application}
                  customer={project.customer}
                  location={project.location}
                />
              </div>
            ))}
          </div>
        </div>

        <div className={styles.controls}>
          <button
            className={styles.prev}
            onClick={handlePrev}
            disabled={index === 0}
          >
            ← Prev
          </button>

          <button
            className={styles.next}
            onClick={handleNext}
            disabled={index >= projects.length - visibleCount}
          >
            Next →
          </button>
        </div>
      </div>
    </section>
  );
}