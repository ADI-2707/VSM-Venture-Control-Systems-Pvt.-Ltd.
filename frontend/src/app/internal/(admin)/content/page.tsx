"use client";

import { useState } from "react";
import styles from "./Content.module.css";
import { useMedia } from "@/internal/context/MediaContext";
import PageSelector from "@/internal/sections/content/PageSelector/PageSelector";

export default function ContentPage() {
  const [page, setPage] = useState("home");
  const [showPicker, setShowPicker] = useState(false);

  const { state, dispatch } = useMedia();

  const assignedIds = state.pageMedia[page] || [];

  const assignedMedia = state.media.filter((m) =>
    assignedIds.includes(m.id)
  );

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        
        <div>
          <h1 className={styles.title}>Content Management</h1>
          <p className={styles.subtitle}>
            Assign media to pages
          </p>
        </div>

        <PageSelector selected={page} setSelected={setPage} />
      </div>

      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <h3>Assigned Media</h3>

          <button onClick={() => setShowPicker(true)}>
            + Add Media
          </button>
        </div>

        {assignedMedia.length === 0 ? (
          <div className={styles.empty}>
            No media assigned yet. Click "Add Media" to begin.
          </div>
        ) : (
          <div className={styles.grid}>
            {assignedMedia.map((item) => (
              <div key={item.id} className={styles.card}>
                <img src={item.url} alt={item.name} />

                <button
                  onClick={() =>
                    dispatch({
                      type: "REMOVE_MEDIA_FROM_PAGE",
                      payload: { page, mediaId: item.id },
                    })
                  }
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {showPicker && (
        <div
          className={styles.modalBackdrop}
          onClick={() => setShowPicker(false)}
        >
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <h3>Select Media</h3>

            <div className={styles.grid}>
              {state.media.map((item) => (
                <div
                  key={item.id}
                  className={styles.card}
                  onClick={() => {
                    dispatch({
                      type: "ASSIGN_MEDIA_TO_PAGE",
                      payload: { page, mediaId: item.id },
                    });
                    setShowPicker(false);
                  }}
                >
                  <img src={item.url} alt={item.name} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}