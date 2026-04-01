import styles from "./FeaturedProduct.module.css";

export default function FeaturedProduct() {
  return (
    <div className={styles.wrapper}>
      <h3>Featured</h3>

      <div className={styles.card}>
        <h4>ACS880</h4>
        <p>High-performance industrial drive system</p>

        <button>Explore</button>
      </div>
    </div>
  );
}