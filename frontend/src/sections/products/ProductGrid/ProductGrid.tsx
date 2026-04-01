import styles from "./ProductGrid.module.css";
import { productsData } from "../productData";
import ProductCard from "../ProductCard/ProductCard";

interface ProductGridProps {
  active: string;
}

export default function ProductGrid({ active }: ProductGridProps) {
  return (
    <div className={styles.wrapper}>
      {productsData
        .filter((group) => group.category.toLowerCase() === active)
        .map((group) => (
          <div key={group.category} className={styles.section}>
            <h3>{group.category}</h3>

            <div className={styles.grid}>
              {group.items.map((item) => (
                <ProductCard
                  key={item}
                  title={item}
                  category={group.category}
                />
              ))}
            </div>
          </div>
        ))}
    </div>
  );
}