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
      <h2 className={styles.title}>Media Library</h2>

      <div className={styles.grid}>
        {media.map((src, i) => (
          <div key={i} className={styles.card}>
            <img src={src} alt="media" />
          </div>
        ))}
      </div>
    </div>
  );
}