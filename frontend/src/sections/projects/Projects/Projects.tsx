"use client";

import { useState } from "react";
import styles from "./Projects.module.css";
import { projects } from "../projectData";
import ProjectCard from "../ProjectCard/ProjectCard";

export default function Projects() {

  const [index, setIndex] = useState(0);

  const getVisibleCount = () => {
    if (typeof window === "undefined") return 4;

    if (window.innerWidth <= 600) return 1;
    if (window.innerWidth <= 1024) return 2;
    return 4;
  };

  const visibleCount = getVisibleCount();

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

        <div className={styles.carouselViewport}>

          <div
            className={styles.carouselTrack}
            style={{
              transform: `translateX(-${index * (100 / visibleCount)}%)`
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