"use client";

import { useState } from "react";
import styles from "./Projects.module.css";
import { projects, PROJECTS_PER_PAGE } from "../projectData";
import ProjectCard from "../ProjectCard/ProjectCard";
import SkeletonCard from "../SkeletonCard/SkeletonCard";

export default function Projects() {
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);

  const totalPages = Math.ceil(projects.length / PROJECTS_PER_PAGE);
  const start = page * PROJECTS_PER_PAGE;
  const end = start + PROJECTS_PER_PAGE;

  const visibleProjects = projects.slice(start, end);

  const handleNext = () => {
    if (page >= totalPages - 1) return;

    setLoading(true);

    setTimeout(() => {
      setPage((prev) => prev + 1);
      setLoading(false);
    }, 400);
  };

  const handlePrev = () => {
    if (page <= 0) return;

    setLoading(true);

    setTimeout(() => {
      setPage((prev) => prev - 1);
      setLoading(false);
    }, 400);
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
            disabled={page === 0 || loading}
          >
            ← Prev
          </button>

          <button
            className={styles.next}
            onClick={handleNext}
            disabled={page === totalPages - 1 || loading}
          >
            Next →
          </button>
        </div>
      </div>
    </section>
  );
}