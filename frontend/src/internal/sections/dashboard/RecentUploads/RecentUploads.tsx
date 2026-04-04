import styles from "./RecentUploads.module.css";

const uploads = [
  "project1.jpg",
  "team_photo.png",
  "plant_video.mp4",
  "dashboard_mock.png",
];

export default function RecentUploads() {
  return (
    <div className={styles.panel}>
      <h3 className={styles.title}>Recent Uploads</h3>

      <ul className={styles.list}>
        {uploads.map((file, i) => (
          <li key={i}>{file}</li>
        ))}
      </ul>
    </div>
  );
}