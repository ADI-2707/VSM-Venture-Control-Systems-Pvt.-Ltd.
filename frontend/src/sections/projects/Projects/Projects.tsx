"use client";

import { useState } from "react";
import styles from "./Projects.module.css";
import { projects, PROJECTS_PER_PAGE } from "../projectData";
import ProjectCard from "../ProjectCard/ProjectCard";
import SkeletonCard from "../SkeletonCard/SkeletonCard";

export default function Projects() {

  const [startIndex, setStartIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  const visibleProjects = projects.slice(
    startIndex,
    startIndex + PROJECTS_PER_PAGE
  );

  const handleNext = () => {

    if (startIndex + PROJECTS_PER_PAGE >= projects.length) return;

    setLoading(true);

    setTimeout(() => {
      setStartIndex((prev) => prev + 1);
      setLoading(false);
    }, 300);
  };

  const handlePrev = () => {

    if (startIndex === 0) return;

    setLoading(true);

    setTimeout(() => {
      setStartIndex((prev) => prev - 1);
      setLoading(false);
    }, 300);
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>
          Latest Projects And Updates.
        </h2>

        <div className={styles.grid}>
          {loading
            ? Array.from({ length: PROJECTS_PER_PAGE }).map((_, i) => (
                <SkeletonCard key={i} />
              ))
            : visibleProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  image={project.image}
                  application={project.application}
                  customer={project.customer}
                  location={project.location}
                />
              ))}
        </div>

        <div className={styles.controls}>
          <button
            className={styles.prev}
            onClick={handlePrev}
            disabled={startIndex === 0 || loading}
          >
            ← Prev
          </button>

          <button
            className={styles.next}
            onClick={handleNext}
            disabled={
              startIndex + PROJECTS_PER_PAGE >= projects.length || loading
            }
          >
            Next →
          </button>
        </div>

      </div>
    </section>
  );
}