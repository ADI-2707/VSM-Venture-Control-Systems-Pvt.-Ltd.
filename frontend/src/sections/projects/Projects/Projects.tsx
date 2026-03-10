import styles from "./Projects.module.css";
import { projects } from "../projectData";
import ProjectCard from "../ProjectCard/ProjectCard";

export default function Projects() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>
          Latest Projects And Updates.
        </h2>

        <div className={styles.grid}>
          {projects.map((project) => (
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