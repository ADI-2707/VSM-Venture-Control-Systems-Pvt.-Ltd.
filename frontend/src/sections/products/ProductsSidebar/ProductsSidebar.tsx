import styles from "./ProductsSidebar.module.css";
import { productsData } from "../productData";

export default function ProductsSidebar() {
  return (
    <aside className={styles.sidebar}>
      {productsData.map((group) => (
        <div key={group.category} className={styles.group}>
          <h4>{group.category}</h4>
          <ul>
            {group.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      ))}
    </aside>
  );
}