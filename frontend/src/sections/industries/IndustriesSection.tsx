"use client";

import styles from "./IndustriesSection.module.css";
import IndustriesDeck from "./IndustriesDeck";

export default function IndustriesSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>

        <div className={styles.header}>
          <h2>Industries We Serve</h2>
          <p>
            Delivering automation and control solutions across a wide range
            of industrial sectors.
          </p>
        </div>

        <IndustriesDeck />

      </div>
    </section>
  );
}