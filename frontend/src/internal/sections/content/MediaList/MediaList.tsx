import styles from "./MediaList.module.css";

const dummyMedia = [
  "image1.jpg",
  "banner.png",
  "plant.mp4",
];

export default function MediaList({ page }: { page: string }) {
  return (
    <div className={styles.card}>

      <div className={styles.header}>
        <h3>Media Library</h3>
        <span>Page: {page}</span>
      </div>

      <div className={styles.grid}>
        {dummyMedia.map((file) => (
          <div key={file} className={styles.item}>
            <div className={styles.preview}></div>

            <div className={styles.meta}>
              <span className={styles.name}>{file}</span>
              <span className={styles.type}>
                {file.split(".").pop()?.toUpperCase()}
              </span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}