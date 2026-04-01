import styles from "./ProductCard.module.css";

export default function ProductCard({ title }: { title: string }) {
  return (
    <div className={styles.card}>
      <div className={styles.icon}></div>

      <h4>{title}</h4>
      <p>Industrial automation component</p>

      <button>View Details</button>
    </div>
  );
}