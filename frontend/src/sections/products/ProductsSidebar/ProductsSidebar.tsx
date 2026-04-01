"use client";

import styles from "./ProductsSidebar.module.css";
import { productsData } from "../productData";
import { useState } from "react";

export default function ProductsSidebar() {
  const [active, setActive] = useState("drives");

  const handleClick = (category: string) => {
    const id = category.toLowerCase();
    setActive(id);

    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

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
                  onClick={() => handleClick(group.category)}
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