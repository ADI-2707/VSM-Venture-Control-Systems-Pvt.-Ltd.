"use client";

import styles from "./ProductsLayout.module.css";
import ProductSidebar from "../ProductsSidebar/ProductsSidebar";
import ProductGrid from "../ProductGrid/ProductGrid";
import FeaturedProduct from "../FeaturedProduct/FeaturedProduct";
import { useState } from "react";

export default function ProductsLayout() {
  const [activeCategory, setActiveCategory] = useState("drives");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="container">
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <h1>Products</h1>
          <p>
            Industrial automation solutions including drives, motors, PLCs and control panels.
          </p>
        </div>

        <button
          className={styles.hamburger}
          onClick={() => setSidebarOpen(true)}
        >
          <svg width="22" height="22" viewBox="0 0 24 24">
            <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>

        <div className={styles.container}>

          <ProductSidebar
            active={activeCategory}
            setActive={setActiveCategory}
          />

          <div className={`${styles.sidebarDrawer} ${sidebarOpen ? styles.open : ""}`}>
            <ProductSidebar
              active={activeCategory}
              setActive={(val) => {
                setActiveCategory(val);
                setSidebarOpen(false);
              }}
            />
          </div>

          <ProductGrid active={activeCategory} />

          <FeaturedProduct />

          <div className={styles.featuredMobile}>
            <FeaturedProduct />
          </div>

        </div>
      </div>
    </div>
  );
}