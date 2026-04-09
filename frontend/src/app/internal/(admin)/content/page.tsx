"use client";

import { useState } from "react";
import styles from "./Content.module.css";
import PageSelector from "@/internal/sections/content/PageSelector/PageSelector";
import MediaUpload from "@/internal/sections/content/MediaUpload/MediaUpload";
import MediaList from "@/internal/sections/content/MediaList/MediaList";

export default function ContentPage() {
  const [page, setPage] = useState("home");

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        
        <div>
          <h1 className={styles.title}>Content Management</h1>
          <p className={styles.subtitle}>
            Upload and manage media for your website pages
          </p>
        </div>

        <PageSelector selected={page} setSelected={setPage} />
      </div>

      <MediaUpload />

      <MediaList page={page} />
    </div>
  );
}