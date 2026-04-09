"use client";

import styles from "./MediaUpload.module.css";

export default function MediaUpload() {
  return (
    <div className={styles.card}>

      <div className={styles.header}>
        <h3>Upload Media</h3>
        <span>Images, videos supported</span>
      </div>

      <div className={styles.uploadArea}>
        <input type="file" multiple />

        <p>Drag & drop files here or click to browse</p>
      </div>

      <div className={styles.actions}>
        <button className={styles.uploadBtn}>Upload Files</button>
      </div>

    </div>
  );
}