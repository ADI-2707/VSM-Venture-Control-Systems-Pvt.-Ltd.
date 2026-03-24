"use client";

import Image from "next/image";
import Modal from "@/components/ui/Modal/Modal";
import styles from "./ProjectModal.module.css";

interface Project {
  id: number;
  application: string;
  customer: string;
  location: string;
  image: string;
  description?: string;
}

interface Props {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: Props) {
  if (!project) return null;

  return (
    <Modal isOpen={!!project} onClose={onClose}>
      <div className={styles.content}>

        <h2 className={styles.title}>{project.application}</h2>

        <div className={styles.imageWrapper}>
          <Image
            src={project.image}
            alt={project.application}
            fill
            className={styles.image}
          />
        </div>

        <div className={styles.info}>
          <p><strong>Customer:</strong> {project.customer}</p>
          <p><strong>Location:</strong> {project.location}</p>
        </div>

        <div className={styles.description}>
          {project.description || "Detailed project information will be available here."}
        </div>

        <button className={styles.closeBtn} onClick={onClose}>
          Close
        </button>

      </div>
    </Modal>
  );
}