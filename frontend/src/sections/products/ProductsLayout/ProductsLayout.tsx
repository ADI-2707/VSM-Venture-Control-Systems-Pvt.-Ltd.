"use client";

import styles from "./ProductsLayout.module.css";
import ProductSidebar from "../ProductsSidebar/ProductsSidebar";
import ProductGrid from "../ProductGrid/ProductGrid";
import FeaturedProduct from "../FeaturedProduct/FeaturedProduct";
import { useState } from "react";

export default function ProductsLayout() {
  const [activeCategory, setActiveCategory] = useState("drives");

  return (
    <div className="container">
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <h1>Products</h1>
          <p>
            Industrial automation solutions including drives, motors, PLCs and control panels.
          </p>
        </div>

        <div className={styles.container}>
          <ProductSidebar
            active={activeCategory}
            setActive={setActiveCategory}
          />

          <ProductGrid active={activeCategory} />

          <FeaturedProduct />
        </div>
      </div>
    </div>
  );
}