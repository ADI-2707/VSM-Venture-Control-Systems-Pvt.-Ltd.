import styles from "./ProductsLayout.module.css";
import ProductSidebar from "../ProductsSidebar/ProductsSidebar";
import ProductGrid from "../ProductGrid/ProductGrid";
import FeaturedProduct from "../FeaturedProduct/FeaturedProduct";

export default function ProductsLayout() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h1>Products</h1>
        <p>
          Industrial automation solutions including drives, motors, PLCs and control panels.
        </p>
      </div>

      <div className={styles.container}>
        <ProductSidebar />
        <ProductGrid />
        <FeaturedProduct />
      </div>
    </div>
  );
}