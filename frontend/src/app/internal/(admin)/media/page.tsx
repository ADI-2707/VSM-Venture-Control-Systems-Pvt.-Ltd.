"use client";

import { useState } from "react";
import styles from "./MediaPage.module.css";

const media = [
  "/images/gallery/team/1.jfif",
  "/images/gallery/team/2.jfif",
  "/images/gallery/team/3.jfif",
  "/images/gallery/team/4.jfif",
  "/images/gallery/team/5.jfif",
];

export default function MediaPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <div className={styles.container}>

      <div className={styles.header}>
        <div>
          <h1>Media Library</h1>
          <p>Manage and organize your uploaded assets</p>
        </div>

        <div className={styles.actions}>
          <input placeholder="Search media..." />
          <button>Upload</button>
        </div>
      </div>

      <div className={styles.infoBar}>
        <span>{media.length} assets</span>
        <span>Last updated just now</span>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <h3>All Media</h3>
        </div>

        <div className={styles.grid}>
          {media.map((src, i) => (
            <div
              key={i}
              className={styles.card}
              onClick={() => setSelectedImage(src)}
            >
              <img src={src} alt="media" />

              <div className={styles.overlay}>
                <span>View</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedImage && (
        <div
          className={styles.modalBackdrop}
          onClick={() => setSelectedImage(null)}
        >
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className={styles.closeBtn}
              onClick={() => setSelectedImage(null)}
            >
              ✕
            </button>

            <img src={selectedImage} alt="preview" />
          </div>
        </div>
      )}

    </div>
  );
}