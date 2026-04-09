"use client";

import styles from "./MediaPage.module.css";

const media = [
  "/images/gallery/team/1.jfif",
  "/images/gallery/team/2.jfif",
  "/images/gallery/team/3.jfif",
  "/images/gallery/team/4.jfif",
  "/images/gallery/team/5.jfif",
];

export default function MediaPage() {
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
            <div key={i} className={styles.card}>

              <img src={src} alt="media" />

              <div className={styles.overlay}>
                <span>View</span>
              </div>

            </div>
          ))}
        </div>
      </div>

    </div>
  );
}