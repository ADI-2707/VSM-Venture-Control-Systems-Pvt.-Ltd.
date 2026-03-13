"use client";

import styles from "./IndustriesSection.module.css";
import { industries } from "./industriesData";

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

        <div className={styles.grid}>
          {industries.map((industry) => (
            <div key={industry.id} className={styles.card}>
              <h3>{industry.name}</h3>
              <p>{industry.description}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}