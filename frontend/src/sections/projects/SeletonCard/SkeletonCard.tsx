import styles from "./SkeletonCard.module.css";

export default function SkeletonCard() {
  return (
    <div className={styles.card}>
      <div className={styles.inner}>
        <div className={styles.image}></div>

        <div className={styles.content}>
          <div className={styles.row}></div>
          <div className={styles.row}></div>
          <div className={styles.row}></div>
          <div className={styles.arrow}></div>
        </div>
      </div>
    </div>
  );
}