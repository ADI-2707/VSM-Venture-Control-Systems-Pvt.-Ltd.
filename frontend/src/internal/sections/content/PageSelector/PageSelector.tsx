"use client";

import styles from "./PageSelector.module.css";

const pages = [
  "home",
  "about",
  "applications",
  "gallery",
  "products",
  "solutions",
];

export default function PageSelector({
  selected,
  setSelected,
}: {
  selected: string;
  setSelected: (val: string) => void;
}) {
  return (
    <div className={styles.wrapper}>
      <label>Select Page</label>

      <select
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
        className={styles.select}
      >
        {pages.map((page) => (
          <option key={page} value={page}>
            {page}
          </option>
        ))}
      </select>
    </div>
  );
}