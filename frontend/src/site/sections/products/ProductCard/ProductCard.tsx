import styles from "./ProductCard.module.css";
import ProductIcon from "./ProductIcon";

export default function ProductCard({
  title,
  category,
}: {
  title: string;
  category: string;
}) {
  const type = category.toLowerCase();

  return (
    <div className={styles.card}>
      <div className={styles.icon}>
        <ProductIcon type={type} />
      </div>

      <h4>{title}</h4>
      <p>Industrial automation component</p>

      <button>View Details</button>
    </div>
  );
}