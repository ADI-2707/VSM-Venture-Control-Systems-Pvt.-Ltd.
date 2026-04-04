"use client";

import styles from "./MediaUpload.module.css";

export default function MediaUpload() {
  return (
    <div className={styles.box}>
      <input type="file" multiple className={styles.input} />

      <button className={styles.button}>Upload</button>
    </div>
  );
}