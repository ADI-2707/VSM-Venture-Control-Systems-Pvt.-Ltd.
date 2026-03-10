"use client";

import { useState } from "react";
import styles from "./Projects.module.css";
import { projects, PROJECTS_PER_PAGE } from "../projectData";
import ProjectCard from "../ProjectCard/ProjectCard";
import SkeletonCard from "../SkeletonCard/SkeletonCard";

export default function Projects() {
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);

  const start = page * PROJECTS_PER_PAGE;
  const end = start + PROJECTS_PER_PAGE;

  const visibleProjects = projects.slice(start, end);

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
      </div>
    </section>
  );
}