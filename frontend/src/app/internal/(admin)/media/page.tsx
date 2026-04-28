"use client";

import { useState } from "react";
import styles from "./MediaPage.module.css";
import { useMedia, Media } from "@/context/MediaContext";
import { useRBACGuard } from "@/hooks/useRBACGuard";

export default function MediaPage() {
  const { isAllowed, isLoading } = useRBACGuard();
  const { state, dispatch } = useMedia();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleUpload = () => {
    const newMedia: Media = {
      id: Date.now().toString(),
      url: "/images/gallery/team/4.jfif",
      name: "new_upload.jpg",
      type: "image",
      createdAt: new Date().toISOString(),
    };

    dispatch({ type: "UPLOAD_MEDIA", payload: newMedia });
  };

  if (isLoading || !isAllowed) return null;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1>Media Library</h1>
          <p>Manage and organize your uploaded assets</p>
        </div>

        <div className={styles.actions}>
          <input placeholder="Search media..." />
          <button onClick={handleUpload}>Upload</button>
        </div>
      </div>

      <div className={styles.grid}>
        {state.media.map((item) => (
          <div
            key={item.id}
            className={styles.card}
            onClick={() => setSelectedImage(item.url)}
          >
            <img src={item.url} alt={item.name} />

            <div className={styles.overlay}>
              <span>View</span>
            </div>
          </div>
        ))}
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
            <button onClick={() => setSelectedImage(null)}>✕</button>
            <img src={selectedImage} alt="preview" />
          </div>
        </div>
      )}
    </div>
  );
}