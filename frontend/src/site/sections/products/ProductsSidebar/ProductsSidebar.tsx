"use client";

import styles from "./ProductsSidebar.module.css";
import { productsData } from "../productData";

interface SidebarProps {
  active: string;
  setActive: (val: string) => void;
}

export default function ProductsSidebar({ active, setActive }: SidebarProps) {
  return (
    <aside className={styles.sidebar}>
      {productsData.map((group) => {
        const id = group.category.toLowerCase();
        const isActive = active === id;

        return (
          <div key={group.category} className={styles.group}>
            <h4>{group.category}</h4>

            <ul>
              {group.items.map((item) => (
                <li
                  key={item}
                  className={isActive ? styles.active : ""}
                  onClick={() => setActive(id)}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </aside>
  );
}