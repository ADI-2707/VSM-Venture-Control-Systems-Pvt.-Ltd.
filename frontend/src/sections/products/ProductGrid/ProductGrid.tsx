import styles from "./ProductGrid.module.css";
import { productsData } from "../productData";
import ProductCard from "../ProductCard/ProductCard";

export default function ProductGrid() {
  return (
    <div className={styles.wrapper}>
      {productsData.map((group) => (
        <div
          id={group.category.toLowerCase()}
          key={group.category}
          className={styles.section}
        >
          <h3>{group.category}</h3>

          <div className={styles.grid}>
            {group.items.map((item) => (
              <ProductCard
                key={item}
                title={item}
                category={group.category} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}