import styles from "./MediaList.module.css";

const dummyMedia = [
  "image1.jpg",
  "banner.png",
  "plant.mp4",
];

export default function MediaList({ page }: { page: string }) {
  return (
    <div className={styles.box}>
      <h3 className={styles.title}>Media for: {page}</h3>

      <ul className={styles.list}>
        {dummyMedia.map((file) => (
          <li key={file}>{file}</li>
        ))}
      </ul>
    </div>
  );
}